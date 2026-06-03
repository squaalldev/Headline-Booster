import {
  FaCommentDots,
  FaCheckDouble,
  FaLightbulb,
  FaPhone,
  FaHospitalUser,
  FaVolumeUp,
  FaRegSmile,
  FaBriefcase,
  FaPlane,
  FaGlobe,
  FaClock,
} from "react-icons/fa";

import { speak as speakUtil } from "../../utils/speak";

export default function LevelB1() {
  const sections = [
    {
      title: "Expressing Opinions | Opiniones",
      icon: <FaCommentDots className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I think that...", es: "Creo que..." },
        { en: "In my opinion...", es: "En mi opinión..." },
        { en: "I believe that...", es: "Creo que..." },
        { en: "From my point of view...", es: "Desde mi punto de vista..." },
        { en: "I agree with you", es: "Estoy de acuerdo contigo" },
        { en: "I disagree", es: "No estoy de acuerdo" },
        { en: "That's a good point", es: "Buen punto" },
        { en: "I'm not sure about that", es: "No estoy seguro de eso" },
        { en: "I see what you mean", es: "Entiendo lo que dices" },
        { en: "I totally agree", es: "Estoy totalmente de acuerdo" },
      ],
      tips: "💡 Usa frases completas para sonar más natural en conversación.",
    },

    {
      title: "Present Perfect",
      icon: <FaCheckDouble className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I have visited Paris", es: "He visitado París" },
        { en: "She has studied English", es: "Ella ha estudiado inglés" },
        { en: "I have never tried sushi", es: "Nunca he probado sushi" },
        { en: "Have you ever been to London?", es: "¿Has estado en Londres?" },
        { en: "We have already eaten", es: "Ya hemos comido" },
        { en: "They haven't finished yet", es: "No han terminado aún" },
        { en: "I have just arrived", es: "Acabo de llegar" },
        { en: "He has lost his keys", es: "Él ha perdido sus llaves" },
      ],
      tips: "💡 Conecta pasado con presente (experiencias y resultados).",
    },

    {
      title: "Suggestions | Sugerencias",
      icon: <FaLightbulb className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Let's go to the cinema", es: "Vamos al cine" },
        { en: "Why don't we eat out?", es: "¿Por qué no comemos fuera?" },
        { en: "What about going to the beach?", es: "¿Qué tal ir a la playa?" },
        { en: "How about studying together?", es: "¿Qué tal estudiar juntos?" },
        { en: "I suggest going early", es: "Sugiero ir temprano" },
        { en: "We could try that restaurant", es: "Podríamos probar ese restaurante" },
      ],
      tips: "💡 Usa 'could' para sugerencias más suaves.",
    },

    {
      title: "Phone English",
      icon: <FaPhone className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Can you hear me?", es: "¿Me escuchas?" },
        { en: "Hold on a moment", es: "Espera un momento" },
        { en: "I'll call you back", es: "Te llamo luego" },
        { en: "Who is speaking?", es: "¿Quién habla?" },
        { en: "I can't hear you well", es: "No te escucho bien" },
        { en: "The line is bad", es: "La llamada está mala" },
        { en: "Can you repeat that?", es: "¿Puedes repetir eso?" },
      ],
      tips: "💡 Frases cortas = mejor comunicación por teléfono.",
    },

    {
      title: "At the Doctor",
      icon: <FaHospitalUser className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I don't feel well", es: "No me siento bien" },
        { en: "I have a headache", es: "Me duele la cabeza" },
        { en: "I have a fever", es: "Tengo fiebre" },
        { en: "I feel dizzy", es: "Me siento mareado" },
        { en: "I have a cough", es: "Tengo tos" },
        { en: "How long have you had this?", es: "¿Cuánto tiempo llevas así?" },
        { en: "It hurts here", es: "Me duele aquí" },
      ],
      tips: "💡 Describe síntomas de forma clara y simple.",
    },

    {
      title: "Daily Life Expressions",
      icon: <FaRegSmile className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I'm busy", es: "Estoy ocupado" },
        { en: "I'm tired", es: "Estoy cansado" },
        { en: "I'm late", es: "Estoy tarde" },
        { en: "I'm hungry", es: "Tengo hambre" },
        { en: "I need a break", es: "Necesito un descanso" },
        { en: "I'm bored", es: "Estoy aburrido" },
        { en: "I'm in a hurry", es: "Tengo prisa" },
      ],
      tips: "💡 Estas frases se usan todos los días en inglés real.",
    },

    {
      title: "Work & Study",
      icon: <FaBriefcase className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I work as a developer", es: "Trabajo como desarrollador" },
        { en: "I study English every day", es: "Estudio inglés todos los días" },
        { en: "I have a meeting", es: "Tengo una reunión" },
        { en: "I'm learning new skills", es: "Estoy aprendiendo nuevas habilidades" },
        { en: "I work from home", es: "Trabajo desde casa" },
      ],
      tips: "💡 Habla de tu vida diaria en inglés constantemente.",
    },

    {
      title: "Travel English",
      icon: <FaPlane className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Where is the airport?", es: "¿Dónde está el aeropuerto?" },
        { en: "I need a taxi", es: "Necesito un taxi" },
        { en: "How much is the ticket?", es: "¿Cuánto cuesta el boleto?" },
        { en: "I am traveling to Colombia", es: "Estoy viajando a Colombia" },
        { en: "Where is my gate?", es: "¿Dónde está mi puerta de embarque?" },
      ],
      tips: "💡 Frases esenciales para viajar sin problemas.",
    },

    {
      title: "Time & Frequency",
      icon: <FaClock className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Always", es: "Siempre" },
        { en: "Usually", es: "Usualmente" },
        { en: "Sometimes", es: "A veces" },
        { en: "Rarely", es: "Rara vez" },
        { en: "Never", es: "Nunca" },
        { en: "Every day", es: "Todos los días" },
      ],
      tips: "💡 Estas palabras controlan el presente simple.",
    },

    {
      title: "Countries & Travel Talk",
      icon: <FaGlobe className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I am from Colombia", es: "Soy de Colombia" },
        { en: "Where are you from?", es: "¿De dónde eres?" },
        { en: "I would like to travel", es: "Me gustaría viajar" },
        { en: "I have been to USA", es: "He estado en Estados Unidos" },
      ],
      tips: "💡 Útil para conversaciones reales con extranjeros.",
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section, idx) => (
        <div key={idx} className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800">

          <h2 className="font-semibold mb-3 text-lg flex items-center">
            {section.icon}
            {section.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {section.items.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-white dark:bg-gray-700">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {item.en}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      → {item.es}
                    </p>
                  </div>

                  <button
                    onClick={() => speakUtil(item.en)}
                    className="text-[#a87a64] hover:scale-110 transition"
                  >
                    <FaVolumeUp />
                  </button>

                </div>

              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#a87a64]/10 border border-[#a87a64]/20">
            <p className="text-sm text-[#a87a64]">
              {section.tips}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}