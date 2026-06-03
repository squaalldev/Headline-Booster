import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaMoon,
  FaSun,
  FaAlignLeft,
  FaLanguage,
  FaSignOutAlt,
  FaBook,
  FaSmile,
} from "react-icons/fa";

const SettingsModal = ({
  showSettings,
  setShowSettings,
  darkMode,
  setDarkMode,
  translationFormat,
  setTranslationFormat,
  showTranslation,
  setShowTranslation,
  onSignOut,
  personalityId,
  setPersonalityId,
  personalities,
}) => {
  const navigate = useNavigate();

  if (!showSettings) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => setShowSettings(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-[#1f1f23] rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-gray-200 dark:border-gray-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Ajustes
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Personaliza tu experiencia
            </p>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {darkMode ? (
                  <FaMoon className="text-indigo-400" size={18} />
                ) : (
                  <FaSun className="text-amber-500" size={18} />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Apariencia
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cambia entre modo claro y oscuro
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:scale-105 transition"
            >
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </button>
          </div>

          {/* Translation Format */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FaAlignLeft className="text-[#a87a64]" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Traducción
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Párrafo o línea por línea
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                setTranslationFormat(
                  translationFormat === "paragraph"
                    ? "linebyline"
                    : "paragraph",
                )
              }
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:scale-105 transition"
            >
              {translationFormat === "paragraph" ? "Párrafo" : "Líneas"}
            </button>
          </div>

          {/* Show Translation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FaLanguage className="text-[#a87a64]" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Traducción automática
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mostrar traducciones en español
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`w-12 h-6 rounded-full transition relative ${
                showTranslation
                  ? "bg-[#a87a64]"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                  showTranslation ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Selector de personalidad */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FaSmile className="text-[#a87a64]" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Personalidad
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Elige el estilo de tu compañero
                </p>
              </div>
            </div>
            <select
              value={personalityId}
              onChange={(e) => setPersonalityId(Number(e.target.value))}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
            >
              {personalities.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* English Roadmap */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FaBook className="text-[#a87a64]" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  English Roadmap
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Guía de aprendizaje A1 → B2
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowSettings(false);
                navigate("/roadmap");
              }}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:scale-105 transition"
            >
              Ver
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

          {/* Sign Out */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FaSignOutAlt className="text-red-500" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Cerrar sesión
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Salir de tu cuenta
                </p>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;