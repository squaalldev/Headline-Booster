import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessage, getConversations, getMessages } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  FaSmile,
  FaHome,
  FaBook,
  FaGamepad,
  FaPlane,
  FaMoon as FaMoonIcon,
} from "react-icons/fa";

import ChatHeader from "../components/chat/ChatHeader";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import WelcomeHero from "../components/chat/WelcomeHero";
import TypingLoader from "../components/chat/TypingLoader";
import SettingsModal from "../components/chat/SettingsModal";

const Chat = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "¡Hola! Soy tu compañero de inglés. ¿Cómo estás hoy? Let's practice together!",
      translation: null,
      vocabulary: [],
      correction: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [personalityId, setPersonalityId] = useState(1);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [translationFormat, setTranslationFormat] = useState("paragraph");
  const { darkMode, setDarkMode } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [usage, setUsage] = useState({
    used: 0,
    limit: 50,
    remaining: 50,
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasMessages = messages.length > 1;

  // Modo fijo en personajes
  const mode = "personajes";

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    document.title = "Chat | CompartirAI - Tu compañero de inglés";
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const personalities = [
    {
      id: 1,
      name: "Amigo",
      icon: FaSmile,
      desc: "Cálido y alentador",
      color: "#fbbf24",
    },
    {
      id: 2,
      name: "Roomie",
      icon: FaHome,
      desc: "Relajado, del día a día",
      color: "#6ee7b7",
    },
    {
      id: 3,
      name: "Mentor",
      icon: FaBook,
      desc: "Paciente, estructurado",
      color: "#60a5fa",
    },
    {
      id: 4,
      name: "Gamer",
      icon: FaGamepad,
      desc: "Enérgico, divertido",
      color: "#f472b6",
    },
    {
      id: 5,
      name: "Viajero",
      icon: FaPlane,
      desc: "Aventurero, curioso",
      color: "#34d399",
    },
    {
      id: 6,
      name: "Calmado",
      icon: FaMoonIcon,
      desc: "Sereno, relajante",
      color: "#a78bfa",
    },
  ];

  const currentPersonality = personalities.find((p) => p.id === personalityId);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voiceProfiles = {
      amigo: { rate: 0.85, pitch: 1.1, gender: "female" },
      roomie: { rate: 0.9, pitch: 1, gender: "male" }, // voz masculina
      mentor: { rate: 0.7, pitch: 0.9, gender: "male" }, // voz masculina grave
      gamer: { rate: 1.0, pitch: 1.2, gender: "male" },
      viajero: { rate: 0.85, pitch: 1, gender: "female" },
      calmado: { rate: 0.6, pitch: 0.85, gender: "female" },
    };
    const currentMode = currentPersonality?.name?.toLowerCase();
    const profile = voiceProfiles[currentMode] || voiceProfiles.amigo;
    let selectedVoice = null;
    if (profile.gender === "female") {
      selectedVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("google")),
      );
    } else {
      selectedVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.toLowerCase().includes("google") ||
            v.name.toLowerCase().includes("male")),
      );
    }
    if (!selectedVoice)
      selectedVoice = voices.find((v) => v.lang.startsWith("en"));
    if (!selectedVoice && voices.length > 0) selectedVoice = voices[0];
    utterance.voice = selectedVoice;
    utterance.lang = "en-US";
    utterance.rate = profile.rate;
    utterance.pitch = profile.pitch;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadConversations();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await getConversations();



      setConversations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async (convId) => {
    try {
      const data = await getMessages(convId);
      const formatted = data.map((msg) => ({
        id: crypto.randomUUID(),
        role: msg.role,
        content: msg.content,
        translation: msg.translation,
        vocabulary: msg.vocabulary || [],
        correction: msg.correction || null,
      }));
      setMessages(formatted);
      setConversationId(convId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: userMessage,
        translation: null,
        vocabulary: [],
        correction: null,
      },
    ]);
    setIsLoading(true);

    try {
      const response = await sendMessage(
        userMessage,
        personalityId,
        conversationId,
      );



      if (response.usage) {
        setUsage(response.usage);
      }
      if (response.conversation_id && !conversationId) {
        setConversationId(response.conversation_id);
        loadConversations();
      }
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.response,
          translation: response.translation,
          vocabulary: response.vocabulary || [],
          correction: response.correction || null,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "❌ Lo siento, hubo un error.",
          translation: null,
          vocabulary: [],
          correction: null,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const newConversation = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "¡Hola! Soy tu compañero de inglés. ¿Cómo estás hoy? Let's practice together!",
        translation: null,
        vocabulary: [],
        correction: null,
      },
    ]);
    setConversationId(null);
    setShowSidebar(false);
  };

  useEffect(() => {
    newConversation();
  }, [personalityId]);

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {showSidebar && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <ChatSidebar
        showSidebar={showSidebar}
        isDesktop={isDesktop}
        conversations={conversations}
        conversationId={conversationId}
        loadMessages={loadMessages}
        setShowSidebar={setShowSidebar}
        newConversation={newConversation}
        loadConversations={loadConversations}
        currentConversationId={conversationId}
      />

      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <ChatHeader
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          setShowSettings={setShowSettings}
        />

        <div className="w-full px-4 mt-1 mb-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full transition-all"
              style={{
                width: usage.limit
                  ? `${(usage.used / usage.limit) * 100}%`
                  : "0%",
              }}
            />
          </div>

          <div className="flex justify-between text-xs mt-0.5 text-gray-500">
            <span>
              {usage.used} / {usage.limit}
            </span>
            <span>
              {usage.remaining <= 5
                ? `⚠️ te quedan ${usage.remaining}`
                : "🟢 disponible"}
            </span>
          </div>
        </div>

        {!hasMessages ? (
          <WelcomeHero mode={mode} currentPersonality={currentPersonality} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  mode={mode}
                  currentPersonality={currentPersonality}
                  showTranslation={showTranslation}
                  translationFormat={translationFormat}
                  onSpeak={speak}
                />
              ))}
              {isLoading && (
                <TypingLoader currentPersonality={currentPersonality} />
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
          isLoading={isLoading}
          mode={mode}
          inputRef={inputRef}
        />

        <SettingsModal
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          translationFormat={translationFormat}
          setTranslationFormat={setTranslationFormat}
          showTranslation={showTranslation}
          setShowTranslation={setShowTranslation}
          onSignOut={handleSignOut}
          personalityId={personalityId}
          setPersonalityId={setPersonalityId}
          personalities={personalities}
        />
      </div>
    </div>
  );
};

export default Chat;
