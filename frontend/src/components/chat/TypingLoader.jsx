import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

const TypingLoader = ({ currentPersonality }) => {
  // Emoji por personalidad (mismo que en ChatMessage)
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
    <div className="w-full bg-white dark:bg-[#1e1f22]">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex gap-3">
          {/* Avatar con emoji de la personalidad */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center text-white text-xl shadow-md flex-shrink-0">
            {getPersonalityEmoji()}
          </div>
          
          {/* Burbuja de escritura */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-5 py-3 shadow-sm">
            <div className="flex space-x-1.5">
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-2.5 h-2.5 bg-[#a87a64] rounded-full inline-block"
              />
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2.5 h-2.5 bg-[#a87a64] rounded-full inline-block"
              />
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2.5 h-2.5 bg-[#a87a64] rounded-full inline-block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingLoader;