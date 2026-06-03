import {
  FaClock,
  FaSun,
  FaMapMarkerAlt,
  FaChartLine,
  FaUtensils,
  FaVolumeUp,
} from "react-icons/fa";

import { speak } from "../../utils/speak";

export default function LevelA2() {
  const sections = [
    {
      title: "Past Simple | Pasado Simple",
      icon: <FaClock className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I went to school", es: "Fui a la escuela", example: "I went to school yesterday" },
        { en: "I saw a movie", es: "Vi una película", example: "I saw a movie last night" },
        { en: "I ate pizza", es: "Comí pizza", example: "I ate pizza with my friends" },
        { en: "I drank coffee", es: "Bebí café", example: "I drank coffee this morning" },
        { en: "I played soccer", es: "Jugué fútbol", example: "I played soccer yesterday" },
        { en: "I studied English", es: "Estudié inglés", example: "I studied English last week" },
        { en: "Yesterday", es: "Ayer", example: "Yesterday was fun" },
        { en: "Last week", es: "La semana pasada", example: "Last week I traveled" },
        { en: "Last year", es: "El año pasado", example: "Last year I worked a lot" },
      ],
      tips: "💡 Past Simple = acciones terminadas en el pasado. Irregulares no siguen regla.",
    },

    {
      title: "Daily Routines | Rutinas Diarias",
      icon: <FaSun className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I wake up at 7 AM", es: "Me despierto a las 7 AM", example: "I wake up early every day" },
        { en: "I take a shower", es: "Me ducho", example: "I take a shower in the morning" },
        { en: "I have breakfast", es: "Desayuno", example: "I have breakfast at 8 AM" },
        { en: "I go to work", es: "Voy al trabajo", example: "I go to work by bus" },
        { en: "I have lunch", es: "Almuerzo", example: "I have lunch at noon" },
        { en: "I watch TV", es: "Veo televisión", example: "I watch TV at night" },
        { en: "I go to bed", es: "Me acuesto", example: "I go to bed at 10 PM" },
      ],
      tips: "💡 Usa presente simple para rutinas. always / usually / sometimes.",
    },

    {
      title: "Giving Directions | Direcciones",
      icon: <FaMapMarkerAlt className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Where is the bank?", es: "¿Dónde está el banco?", example: "Where is the bank?" },
        { en: "Go straight", es: "Sigue derecho", example: "Go straight and turn left" },
        { en: "Turn left", es: "Gira a la izquierda", example: "Turn left at the corner" },
        { en: "Turn right", es: "Gira a la derecha", example: "Turn right here" },
        { en: "It's next to the supermarket", es: "Está al lado del supermercado", example: "It's next to the supermarket" },
        { en: "It's across from the park", es: "Está frente al parque", example: "It's across from the park" },
      ],
      tips: "💡 Usa: next to, across from, behind, in front of.",
    },

    {
      title: "Comparatives | Comparativos",
      icon: <FaChartLine className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Bigger than", es: "Más grande que", example: "My house is bigger than yours" },
        { en: "Smaller than", es: "Más pequeño que", example: "This phone is smaller than mine" },
        { en: "Better than", es: "Mejor que", example: "This game is better than that one" },
        { en: "Worse than", es: "Peor que", example: "This movie is worse than the other" },
        { en: "More expensive than", es: "Más caro que", example: "This car is more expensive than that one" },
      ],
      tips: "💡 short adjective + er / long adjective → more + adjective",
    },

    {
      title: "Restaurant Phrases | Restaurante",
      icon: <FaUtensils className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I would like a coffee", es: "Me gustaría un café", example: "I would like a coffee please" },
        { en: "Can I have the menu?", es: "¿Me das el menú?", example: "Can I have the menu please?" },
        { en: "What do you recommend?", es: "¿Qué recomiendas?", example: "What do you recommend?" },
        { en: "The bill, please", es: "La cuenta por favor", example: "The bill please" },
        { en: "I'm vegetarian", es: "Soy vegetariano", example: "I'm vegetarian" },
      ],
      tips: "💡 Usa 'I would like' para sonar educado.",
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div key={idx} className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-sm">
          
          {/* TITLE */}
          <h2 className="font-semibold mb-4 text-lg flex items-center">
            {section.icon}
            {section.title}
          </h2>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="group p-4 rounded-xl bg-white dark:bg-gray-700 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {item.en}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {item.es}
                    </p>
                  </div>

                  {/* AUDIO */}
                  <button
                    onClick={() => speak(item.en)}
                    className="text-[#a87a64] hover:scale-110 transition"
                  >
                    <FaVolumeUp />
                  </button>
                </div>

                {/* EXAMPLE */}
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 italic">
                  💬 {item.example}
                </div>
              </div>
            ))}
          </div>

          {/* TIPS */}
          {section.tips && (
            <div className="mt-4 p-3 rounded-lg bg-[#a87a64]/10 border border-[#a87a64]/20">
              <p className="text-sm text-[#a87a64]">
                {section.tips}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}