import { motion } from "framer-motion";

const Mascota = ({ size = 120, animate = true, mode = "universal" }) => {
  // Emojis de caras por personalidad
  const getEmoji = () => {
    const emojis = {
      amigo: "😊",      // Cara sonriente
      roomie: "🫂",      // Cara relajada
      mentor: "🧐",      // Cara con monóculo
      gamer: "😎",       // Cara con gafas
      viajero: "🌍",     // Mundo (viajes)
      calmado: "😇",     // Cara angelical
      universal: "🤖"    // Robot
    };
    return emojis[mode] || "🤖";
  };

  return (
    <motion.div
      animate={{
        y: animate ? [0, -8, 0] : 0,
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="rounded-full bg-gradient-to-r from-[#a87a64] to-[#6e4433] flex items-center justify-center text-white shadow-lg"
      style={{ width: size, height: size }}
    >
      <span style={{ fontSize: size * 0.5 }}>{getEmoji()}</span>
    </motion.div>
  );
};

export default Mascota;