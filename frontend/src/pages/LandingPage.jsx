import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
// Agrega esta importación al inicio (línea 4 aprox)
import { useNavigate } from "react-router-dom";


import {
  FaGlobe,
  FaRobot,
  FaLanguage,
  FaMoon,
  FaSun,
  FaSmile,
  FaBook,
  FaHome,
  FaGamepad,
  FaPlane,
  FaMoon as FaMoonIcon,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaComment,
  FaUserFriends,
  FaGraduationCap,
  FaRocket,
  FaStar,
  FaMicrophone,
  FaVolumeUp,
  FaBolt,
  FaBrain,
  FaCheck,
  FaGoogle,
} from "react-icons/fa";

const LandingPage = ({ onStart }) => {
  const { darkMode, setDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = "CompartirAI | Aprende inglés con IA";
  }, []);

  const personalities = [
    {
      icon: FaSmile,
      name: "Amigo",
      desc: "Conversación natural y cálida",
      color: "#fbbf24",
    },
    {
      icon: FaHome,
      name: "Roomie",
      desc: "Inglés de la vida diaria",
      color: "#6ee7b7",
    },
    {
      icon: FaGraduationCap,
      name: "Mentor",
      desc: "Gramática y estructura",
      color: "#60a5fa",
    },
    {
      icon: FaGamepad,
      name: "Gamer",
      desc: "Aprende jugando",
      color: "#f472b6",
    },
    {
      icon: FaPlane,
      name: "Viajero",
      desc: "Inglés para viajar",
      color: "#34d399",
    },
    {
      icon: FaMoonIcon,
      name: "Calmado",
      desc: "Sin presión, relajado",
      color: "#a78bfa",
    },
  ];

  const features = [
    {
      icon: FaLanguage,
      title: "Traducción en tiempo real",
      desc: "Entiende inglés y español sin perder la conversación",
    },
    {
      icon: FaBrain,
      title: "Corrección inteligente",
      desc: "Aprende mientras hablas, sin clases aburridas",
    },
    {
      icon: FaVolumeUp,
      title: "Pronunciación natural",
      desc: "Escucha cómo se pronuncia cada frase",
    },
    {
      icon: FaUserFriends,
      title: "Personalidades únicas",
      desc: "Habla con IA como si fuera un amigo real",
    },
  ];

  const steps = [
    {
      icon: FaGoogle,
      title: "Conéctate",
      desc: "Empieza en segundos con tu cuenta de Google.",
    },
    {
      icon: FaUserFriends,
      title: "Escoge una personalidad",
      desc: "Amigo, mentor, profesor y más.",
    },
    {
      icon: FaRocket,
      title: "Habla y mejora",
      desc: "La IA corrige errores y te ayuda a progresar cada día.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
      {/* Glow background */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-1/2 w-96 h-96 bg-[#a87a64]/20 dark:bg-[#a87a64]/10 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 -right-1/2 w-96 h-96 bg-[#6e4433]/20 dark:bg-[#6e4433]/10 blur-[120px] rounded-full"
      />

      {/* NAVBAR */}
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo con imagen */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-800 dark:text-white text-lg">
              Compartir
            </span>
            <span className="font-bold text-[#a87a64] text-lg">AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#personalities"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#a87a64] transition"
            >
              Personajes
            </a>

            <a
              href="/roadmap"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#a87a64] transition"
            >
              English Roadmap
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#a87a64] transition"
            >
              Cómo funciona
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {!user ? (
              <div className="flex items-center gap-3">
                {/* Solo el botón de modo oscuro, sin botones de login */}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.user_metadata?.full_name?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "U"}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/chat")}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] text-white text-sm font-medium shadow-lg hover:scale-105 transition"
                >
                  Ir al chat
                </button>

                <button
                  onClick={signOut}
                  className="px-5 py-2 rounded-full border border-[#a87a64]/40 text-[#e7b193] hover:bg-[#a87a64]/10 transition-all duration-300 text-sm font-medium"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a87a64]/10 dark:bg-[#a87a64]/20 mb-6">
              <FaRocket className="text-sm text-[#a87a64]" />
              <span className="text-sm text-[#a87a64] font-medium">
                Nueva experiencia de aprendizaje
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl tracking-tight font-bold text-gray-800 dark:text-white mb-6 leading-tight">
              Habla inglés todos los días,
              <span className="text-[#a87a64]"> sin sentir que estudias</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Habla inglés de forma natural con una IA que traduce, corrige y
              conversa contigo como una persona real.
            </p>

            {/* FEATURES BADGES */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {features.map((f, idx) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <f.icon className="text-sm text-[#a87a64]" size={14} />

                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {f.title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              {!user ? (
                <>
                  <button
                    onClick={signInWithGoogle}
                    className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google"
                      className="w-5 h-5"
                    />
                    Continuar con Google
                  </button>

                  <div className="text-center max-w-md">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tus conversaciones y progreso se guardarán
                      automáticamente.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-500">
                      <span>✓ Historial guardado</span>
                      <span>✓ Progreso sincronizado</span>
                      <span>✓ Acceso desde cualquier dispositivo</span>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate("/chat")}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center group"
                >
                  <FaRocket />
                  Ir al chat
                  <FaArrowRight className="text-lg group-hover:translate-x-1 transition" />
                </button>
              )}
            </div>
          </motion.div>

          {/* CHAT MOCKUP */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-20 rounded-[32px] bg-white dark:bg-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Chat
              </span>
              <span className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Conectado
              </span>
            </div>

            <div className="p-8 space-y-6">
              {/* BOT */}
              <div className="flex justify-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center text-white shadow-md">
                  <FaRobot size={16} />
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-[70%] shadow-sm">
                  <p className="text-gray-800 dark:text-white">
                    Hey! How was your day?
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    🇪🇸 ¡Hey! ¿Cómo estuvo tu día?
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button className="w-7 h-7 rounded-full bg-[#a87a64]/10 flex items-center justify-center hover:bg-[#a87a64]/20 transition">
                      <FaVolumeUp size={12} className="text-[#a87a64]" />
                    </button>

                    <span className="text-[11px] text-gray-400">
                      Escuchar pronunciación
                    </span>
                  </div>

                  <span className="text-[10px] text-gray-400 mt-1 block">
                    10:30 AM
                  </span>
                </div>
              </div>

              {/* USER */}
              <div className="flex justify-end gap-3">
                <div className="bg-gradient-to-r from-[#a87a64] to-[#6e4433] rounded-2xl rounded-br-md px-4 py-3 max-w-[70%] shadow-md">
                  <p className="text-white">
                    It was great! I learned a lot today.
                  </p>

                  <p className="text-xs text-white/70 mt-1">
                    🇪🇸 ¡Estuvo genial! Aprendí mucho hoy.
                  </p>

                  <div className="mt-3 bg-white/10 rounded-xl p-3 border border-white/10">
                    <p className="text-xs font-medium text-white">
                      ✓ Excelente
                    </p>

                    <p className="text-xs text-white/70 mt-1">
                      Buen uso del pasado simple: "learned".
                    </p>
                  </div>

                  <span className="text-[10px] text-white/50 mt-2 block text-right">
                    10:31 AM
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center shadow-sm">
                  <FaUserFriends size={16} />
                </div>
              </div>

              {/* TYPING */}
              <div className="flex justify-start gap-3 opacity-70">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center text-white shadow-md">
                  <FaRobot size={16} />
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <span
                      className="w-2 h-2 bg-[#a87a64] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>

                    <span
                      className="w-2 h-2 bg-[#a87a64] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>

                    <span
                      className="w-2 h-2 bg-[#a87a64] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>

            {/* INPUT */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900/50">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-left text-gray-400 dark:text-gray-500 text-sm flex items-center justify-between">
                <span>Type a message...</span>

                <FaArrowRight className="text-gray-400" size={14} />
              </div>
            </div>
          </motion.div>

          {/* MINI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FaMicrophone className="text-[#a87a64]" />

                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Conversaciones naturales
                </h3>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Habla de cualquier tema y practica inglés todos los días.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FaVolumeUp className="text-[#a87a64]" />

                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Audio y pronunciación
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Escucha cada mensaje para mejorar comprensión y pronunciación.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FaBrain className="text-[#a87a64]" />

                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Correcciones inteligentes
                </h3>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                La IA detecta errores y te ayuda a mejorar mientras conversas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              ¿Cómo funciona?
            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Empieza a practicar inglés en menos de un minuto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#a87a64]/10 flex items-center justify-center">
                  <step.icon className="text-2xl text-[#a87a64]" />
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SMART CORRECTION */}
      <section className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/30 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#a87a64]/10 blur-[140px] rounded-full"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a87a64]/10 dark:bg-[#a87a64]/20 mb-5">
              <FaCheckCircle className="text-[#a87a64] text-sm" />

              <span className="text-sm font-medium text-[#a87a64]">
                Correcciones naturales con IA
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
              Aprende mientras
              <span className="text-[#a87a64]"> conversas</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-14">
              Compartir detecta errores automáticamente y traduce cada
              conversación para que aprendas inglés naturalmente.
            </p>
          </motion.div>

          {/* CHAT CORRECTION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden border border-gray-200 dark:border-gray-700 shadow-[0_25px_70px_rgba(0,0,0,0.12)] max-w-3xl mx-auto"
          >
            {/* TOP BAR */}
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Compartir AI
              </span>
              <span className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Conectado
              </span>
            </div>

            <div className="p-7 md:p-8 space-y-6">
              {/* USER MESSAGE */}
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-[#a87a64] to-[#6e4433] rounded-2xl rounded-br-md px-5 py-3 max-w-[80%] shadow-lg">
                  <p className="text-white text-[15px] md:text-base">
                    I goed to school yesterday
                  </p>

                  <p className="text-white/70 text-xs mt-1">
                    🇪🇸 Yo fui a la escuela ayer
                  </p>
                </div>
              </div>

              {/* AI RESPONSE */}
              <div className="flex items-start gap-3">
                {/* AVATAR */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center text-white shadow-md shrink-0">
                  <FaRobot size={18} />
                </div>

                {/* BUBBLE */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl rounded-bl-md px-5 py-5 max-w-[85%] text-left shadow-sm border border-gray-200/50 dark:border-gray-600/50">
                  {/* INTRO */}
                  <div className="mb-5">
                    <p className="text-gray-800 dark:text-white leading-relaxed">
                      Almost perfect 👌 Here’s the correct sentence:
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      🇪🇸 Casi perfecto 👌 Aquí está la oración correcta:
                    </p>
                  </div>

                  {/* ERROR */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-4 mb-4"
                  >
                    <FaTimesCircle className="text-red-500 mt-1 shrink-0" />

                    <div>
                      <p className="text-gray-800 dark:text-white leading-relaxed">
                        I{" "}
                        <span className="text-red-500 font-semibold line-through">
                          goed
                        </span>{" "}
                        to school yesterday
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        🇪🇸 Yo fui a la escuela ayer
                      </p>

                      <span className="text-xs text-red-500 mt-2 block">
                        Incorrect verb
                      </span>
                    </div>
                  </motion.div>

                  {/* CORRECT */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-4 mb-5"
                  >
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />

                    <div>
                      <p className="text-gray-800 dark:text-white leading-relaxed">
                        I{" "}
                        <span className="text-green-500 font-semibold">
                          went
                        </span>{" "}
                        to school yesterday
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        🇪🇸 Fui a la escuela ayer
                      </p>

                      <span className="text-xs text-green-500 mt-2 block">
                        Correct past tense
                      </span>
                    </div>
                  </motion.div>

                  {/* EXPLANATION */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600 p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <span className="font-semibold text-[#a87a64]">
                          Why?
                        </span>{" "}
                        “Goed” doesn’t exist in English. The correct past tense
                        of “go” is “went”.
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        🇪🇸 “Goed” no existe en inglés. El pasado correcto de
                        “go” es “went”.
                      </p>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300">
                        go → went
                      </span>

                      <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300">
                        yesterday = past
                      </span>
                    </div>
                  </div>

                  {/* SPEAK BUTTON */}
                  <button className="mt-5 flex items-center gap-2 text-sm text-[#a87a64] hover:opacity-80 transition font-medium">
                    <FaVolumeUp />
                    Escuchar pronunciación
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PERSONALITIES */}
      <section id="personalities" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Elige tu compañero de inglés
            </h2>

            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Cada personalidad tiene su propio estilo de conversación. Cambia
              cuando quieras.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {personalities.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#a87a64]/10 flex items-center justify-center">
                  <p.icon className="text-2xl" style={{ color: p.color }} />
                </div>

                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {p.name}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Empieza a hablar inglés hoy
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Miles de conversaciones empiezan con un simple "Hello". La próxima
            puede ser la tuya.
          </p>

          <button
            onClick={signInWithGoogle}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group inline-flex items-center gap-2"
          >
            <FaRocket />
            Comenzar gratis con Google
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col items-center gap-4">
          <a
            href="/roadmap"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FaBook className="text-[#a87a64]" size={14} />
            English Roadmap A1 → B2
          </a>

          <p>
            © {new Date().getFullYear()} Compartir · Aprende inglés conversando
            con IA
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span>Desarrollado por</span>
            <a
              href="https://www.facebook.com/cryptomilovattech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a87a64] hover:underline font-medium"
            >
              Crypto Milovat
            </a>
            <span>•</span>
            <span>Daniel "Dcrypto" Rodriguez</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
