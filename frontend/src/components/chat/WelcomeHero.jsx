import React from 'react';
import Mascota from '../Mascota';

const WelcomeHero = ({ mode, currentPersonality }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <Mascota
        size={160}
        animate={true}
        mode={mode === "universal" ? "universal" : currentPersonality?.name?.toLowerCase()}
      />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 mt-6">
        {mode === "universal" ? "Modo Universal" : currentPersonality?.name}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        {mode === "universal"
          ? "Pregunta lo que quieras sobre inglés. Traducción automática incluida."
          : currentPersonality?.desc}
      </p>
    </div>
  );
};

export default WelcomeHero;