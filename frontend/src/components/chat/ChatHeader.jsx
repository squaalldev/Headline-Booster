import React from "react";
import { FaBars, FaCog } from "react-icons/fa";

const ChatHeader = ({
  showSidebar,
  setShowSidebar,
  setShowSettings,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition lg:hidden"
        >
          <FaBars size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          Compartir
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FaCog size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;