import {
  FaLink,
  FaBriefcase,
  FaMicrophoneAlt,
  FaEnvelope,
  FaPlane,
  FaLeaf,
  FaVolumeUp,
  FaComments,
  FaGlobe,
} from "react-icons/fa";

import { speak as speakUtil } from "../../utils/speak";

export default function LevelB2() {
  const sections = [
    {
      title: "Complex Sentences | Oraciones Complejas",
      icon: <FaLink className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Although it was raining, we went out", es: "Aunque estaba lloviendo, salimos" },
        { en: "However, I think we should wait", es: "Sin embargo, creo que deberíamos esperar" },
        { en: "Due to the bad weather, the flight was cancelled", es: "Debido al mal clima, el vuelo fue cancelado" },
        { en: "Despite being tired, I finished my work", es: "A pesar de estar cansado, terminé mi trabajo" },
        { en: "Therefore, we need to decide now", es: "Por lo tanto, necesitamos decidir ahora" },
        { en: "Even though I was busy, I helped him", es: "Aunque estaba ocupado, lo ayudé" },
      ],
      tips: "💡 Conectores clave: although, however, despite, therefore, even though.",
    },

    {
      title: "Job Interview | Entrevista de Trabajo",
      icon: <FaBriefcase className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Tell me about yourself", es: "Háblame de ti" },
        { en: "What are your strengths?", es: "¿Cuáles son tus fortalezas?" },
        { en: "What are your weaknesses?", es: "¿Cuáles son tus debilidades?" },
        { en: "Why do you want to work here?", es: "¿Por qué quieres trabajar aquí?" },
        { en: "I am a fast learner", es: "Aprendo rápido" },
        { en: "I work well under pressure", es: "Trabajo bien bajo presión" },
        { en: "I am detail-oriented", es: "Soy detallista" },
      ],
      tips: "💡 Usa frases naturales, no traduzcas palabra por palabra.",
    },

    {
      title: "Debates & Opinions | Debate",
      icon: <FaMicrophoneAlt className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I strongly believe that...", es: "Creo firmemente que..." },
        { en: "I see your point, but...", es: "Entiendo tu punto, pero..." },
        { en: "That's not entirely true", es: "Eso no es del todo cierto" },
        { en: "Let's look at both sides", es: "Veamos ambos lados" },
        { en: "To sum up...", es: "Para resumir..." },
        { en: "In conclusion...", es: "En conclusión..." },
        { en: "From my perspective...", es: "Desde mi perspectiva..." },
      ],
      tips: "💡 En debates: respeta, argumenta y concluye claramente.",
    },

    {
      title: "Formal Writing | Escritura Formal",
      icon: <FaEnvelope className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I am writing to apply for the position", es: "Escribo para postular al puesto" },
        { en: "Please find attached my CV", es: "Adjunto mi hoja de vida" },
        { en: "I would appreciate your feedback", es: "Agradecería su respuesta" },
        { en: "Thank you for your time and consideration", es: "Gracias por su tiempo" },
        { en: "Yours sincerely", es: "Atentamente" },
      ],
      tips: "💡 Lenguaje formal = más estructura, menos contracciones.",
    },

    {
      title: "Travel Problems | Problemas de Viaje",
      icon: <FaPlane className="text-[#a87a64] mr-2" />,
      items: [
        { en: "My flight has been delayed", es: "Mi vuelo fue retrasado" },
        { en: "I lost my passport", es: "Perdí mi pasaporte" },
        { en: "My luggage is missing", es: "Mi equipaje está perdido" },
        { en: "Can I speak to the manager?", es: "¿Puedo hablar con el gerente?" },
        { en: "I would like to make a complaint", es: "Quiero hacer una queja" },
      ],
      tips: "💡 Mantén calma y usa frases claras en problemas.",
    },

    {
      title: "Environment | Medio Ambiente",
      icon: <FaLeaf className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Climate change is a global issue", es: "El cambio climático es global" },
        { en: "We must reduce pollution", es: "Debemos reducir la contaminación" },
        { en: "Renewable energy is essential", es: "La energía renovable es esencial" },
        { en: "We should recycle more", es: "Deberíamos reciclar más" },
        { en: "Sustainability is important", es: "La sostenibilidad es importante" },
      ],
      tips: "💡 Usa vocabulario global y académico.",
    },

    {
      title: "Phrasal Verbs | Verbos Frasales",
      icon: <FaComments className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Give up", es: "Rendirse" },
        { en: "Look for", es: "Buscar" },
        { en: "Turn on", es: "Encender" },
        { en: "Turn off", es: "Apagar" },
        { en: "Get along with", es: "Llevarse bien con" },
        { en: "Find out", es: "Descubrir" },
      ],
      tips: "💡 Phrasal verbs = inglés real hablado.",
    },

    {
      title: "Collocations | Expresiones Naturales",
      icon: <FaGlobe className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Make a decision", es: "Tomar una decisión" },
        { en: "Take a break", es: "Tomar un descanso" },
        { en: "Do homework", es: "Hacer tarea" },
        { en: "Have a meeting", es: "Tener una reunión" },
        { en: "Catch a bus", es: "Tomar un bus" },
      ],
      tips: "💡 Collocations = cómo suena natural el inglés.",
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