import React from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import WordByWord from '../WordByWord';

const ChatMessage = ({ message, mode, currentPersonality, showTranslation, translationFormat, onSpeak }) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  // Emoji por personalidad
  const getPersonalityEmoji = () => {
    if (!currentPersonality) return "🤖";
    const emojis = {
      Amigo: "😊",
      Roomie: "🏠",
      Mentor: "🧐",
      Gamer: "😎",
      Viajero: "🌍",
      Calmado: "😌"
    };
    return emojis[currentPersonality.name] || "🤖";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`w-full ${isAssistant ? "bg-white dark:bg-[#1e1f22]" : "bg-[#f7f7f8] dark:bg-[#2a2b32]"}`}
    >
      <div className={`max-w-3xl mx-auto px-4 py-4 ${isAssistant ? "pr-16" : "pl-16"}`}>
        <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
          
          {/* Avatar con emoji de la personalidad (solo para asistente) */}
          {isAssistant && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center text-white text-xl shadow-md flex-shrink-0"
            >
              {getPersonalityEmoji()}
            </motion.div>
          )}

          {/* Burbuja de mensaje */}
          <div className="flex flex-col max-w-[75%]">
            {/* Botón de voz */}
            {isAssistant && (
              <div className="flex justify-end mb-1 mr-1">
                <button
                  onClick={() => onSpeak(message.content)}
                  className="text-gray-400 hover:text-[#a87a64] transition"
                >
                  <FaVolumeUp size={12} />
                </button>
              </div>
            )}

            {/* Burbuja */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                isUser
                  ? "bg-gradient-to-r from-[#a87a64] to-[#6e4433] text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-sm"
              }`}
            >
              <p className="text-[14px] leading-6 whitespace-pre-wrap break-words">
                {message.content}
              </p>

              {/* Traducción dentro de la burbuja (solo asistente) */}
              {isAssistant && showTranslation && message.translation && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <p className="text-xs opacity-80">
                    🇪🇸 {message.translation}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Espacio para alinear al usuario */}
          {isUser && <div className="w-10 h-10 flex-shrink-0" />}
        </div>

        {/* Corrección gramatical */}
        {message.correction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 ml-12 rounded-2xl overflow-hidden border border-[#a87a64]/20 dark:border-[#a87a64]/30 bg-gradient-to-br from-[#fffaf7] to-[#fff] dark:from-[#2b211d] dark:to-[#1f1a17] shadow-md"
          >
            <div className="px-4 py-2.5 border-b border-[#a87a64]/10 bg-[#a87a64]/5 dark:bg-[#a87a64]/10 flex items-center gap-2">
              <span className="text-xs font-medium text-[#a87a64]">✨ Corrección inteligente</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <FaTimesCircle className="text-red-500 mt-0.5 shrink-0" size={14} />
                  <div>
                    <p className="text-gray-800 dark:text-white text-sm">{message.correction.original}</p>
                    <p className="text-xs text-red-500 mt-1">❌ Incorrecto</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" size={14} />
                  <div>
                    <p className="text-gray-800 dark:text-white text-sm font-medium">{message.correction.corrected}</p>
                    <p className="text-xs text-green-500 mt-1">✅ Forma correcta</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">{message.correction.explanation}</p>
              </div>
              <button
                onClick={() => onSpeak(message.correction.corrected)}
                className="flex items-center gap-2 text-sm text-[#a87a64] hover:opacity-80 transition font-medium"
              >
                <FaVolumeUp size={12} /> Escuchar corrección
              </button>
            </div>
          </motion.div>
        )}

        {/* Vocabulario */}
        {isAssistant && showTranslation && message.vocabulary && message.vocabulary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 ml-12"
          >
            <WordByWord
              vocabulary={message.vocabulary}
              fullTranslation={message.translation}
              originalText={message.content}
              format={translationFormat}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;