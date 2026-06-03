import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ChatInput = ({ input, setInput, handleSend, handleKeyPress, isLoading, mode, inputRef }) => {
  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 pb-12">
      <div className="flex gap-2 max-w-3xl mx-auto">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
          placeholder={mode === "universal" ? "Pregunta algo..." : "Escribe en inglés..."}
          rows={1}
          className="flex-1 resize-none rounded-3xl px-5 py-4 text-[15px] bg-[#f4f4f5] dark:bg-[#2a2b32] text-gray-800 dark:text-white placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#a87a64]/30 focus:border-[#a87a64]/30 transition"
          style={{ maxHeight: "200px" }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`px-5 rounded-2xl transition flex items-center justify-center ${input.trim() && !isLoading ? "bg-gradient-to-r from-[#a87a64] to-[#6e4433] text-white shadow-md hover:opacity-90" : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"}`}
        >
          <FaArrowRight size={18} />
        </button>
      </div>
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-3">
        Presiona Enter para enviar · Shift+Enter para nueva línea
      </p>
    </div>
  );
};

export default ChatInput;