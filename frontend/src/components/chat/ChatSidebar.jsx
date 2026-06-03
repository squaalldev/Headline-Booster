import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaTimes, FaTrash } from "react-icons/fa";
import { deleteConversation } from "../../services/api";
import globoLogo from "../../assets/globo.png";

const ChatSidebar = ({
  showSidebar,
  isDesktop,
  conversations,
  conversationId,
  loadMessages,
  setShowSidebar,
  newConversation,
  loadConversations,
  currentConversationId,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(null); // { id, title }

  const handleDeleteClick = (e, convId, convTitle) => {
    e.stopPropagation();
    setConfirmDelete({ id: convId, title: convTitle });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;

    try {
      await deleteConversation(confirmDelete.id);
      await loadConversations();

      if (currentConversationId === confirmDelete.id) {
        newConversation();
      }
    } catch (error) {
      console.error("Error eliminando conversación:", error);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const MAX_CONVERSATIONS = 30;
  const currentCount = conversations.length;
  const remaining = MAX_CONVERSATIONS - currentCount;

  return (
    <>
      <AnimatePresence>
        {(showSidebar || isDesktop) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed lg:relative z-20 w-72 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-800 dark:text-white text-lg">
                    Compartir
                  </span>
                  <span className="font-bold text-[#a87a64] text-lg">AI</span>
                </div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="lg:hidden p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <button
                onClick={newConversation}
                className="mt-3 w-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] text-white rounded-lg py-2 text-sm hover:opacity-90 transition"
              >
                + Nueva conversación
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No hay conversaciones
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Crea una nueva para empezar
                  </p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`group p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-between ${
                      conversationId === conv.id
                        ? "bg-gray-100 dark:bg-gray-800"
                        : ""
                    }`}
                  >
                    <div
                      onClick={() => {
                        loadMessages(conv.id);
                        setShowSidebar(false);
                      }}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-sm text-gray-800 dark:text-white truncate">
                        {conv.title || "Nueva conversación"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(conv.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleDeleteClick(e, conv.id, conv.title)}
                      className="ml-2 p-2 text-gray-400 hover:text-red-500 transition"
                      title="Eliminar conversación"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Indicador de límite de conversaciones */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-500 dark:text-gray-400">
                  Conversaciones
                </span>
                <span
                  className={`font-medium ${remaining <= 5 ? "text-orange-500" : "text-gray-600 dark:text-gray-400"}`}
                >
                  {currentCount} / {MAX_CONVERSATIONS}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    remaining <= 5 ? "bg-orange-500" : "bg-[#a87a64]"
                  }`}
                  style={{
                    width: `${(currentCount / MAX_CONVERSATIONS) * 100}%`,
                  }}
                />
              </div>
              {remaining <= 5 && (
                <p className="text-xs text-orange-500 mt-2">
                  ¡Quedan {remaining} de {MAX_CONVERSATIONS} conversaciones!
                </p>
              )}
              {currentCount >= MAX_CONVERSATIONS && (
                <p className="text-xs text-red-500 mt-2">
                  🔴 Límite alcanzado. La conversación más antigua se eliminará
                  automáticamente.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmación personalizado */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full mx-4 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <FaTrash className="text-red-500" size={18} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Eliminar conversación
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                ¿Estás seguro de que deseas eliminar "
                {confirmDelete.title || "esta conversación"}"?
                <br />
                <span className="text-xs text-gray-400">
                  Esta acción no se puede deshacer.
                </span>
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
