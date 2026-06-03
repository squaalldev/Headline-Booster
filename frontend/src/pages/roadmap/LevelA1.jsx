import {
  FaHandPeace,
  FaBookOpen,
  FaHome,
  FaCommentDots,
  FaHashtag,
  FaVolumeUp,
} from "react-icons/fa";

import { speak } from "../../utils/speak";

export default function LevelA1() {
  const sections = [
    {
      title: "Basic Greetings | Saludos Básicos",
      icon: <FaHandPeace className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Hello", es: "Hola", example: "Hello, how are you?" },
        { en: "Hi", es: "Hola", example: "Hi! Nice to meet you." },
        { en: "Good morning", es: "Buenos días", example: "Good morning, teacher!" },
        { en: "Good afternoon", es: "Buenas tardes", example: "Good afternoon!" },
        { en: "Good night", es: "Buenas noches", example: "Good night, see you tomorrow!" },
        { en: "How are you?", es: "¿Cómo estás?", example: "How are you today?" },
        { en: "Nice to meet you", es: "Gusto en conocerte", example: "Nice to meet you!" },
        { en: "Goodbye", es: "Adiós", example: "Goodbye, see you later!" },
      ],
      tips: "💡 Usa saludos según el momento del día para sonar natural.",
    },

    {
      title: "To Be Verb (Ser/Estar)",
      icon: <FaBookOpen className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I am", es: "Yo soy / estoy", example: "I am happy" },
        { en: "You are", es: "Tú eres / estás", example: "You are my friend" },
        { en: "He is", es: "Él es / está", example: "He is a doctor" },
        { en: "She is", es: "Ella es / está", example: "She is at home" },
        { en: "We are", es: "Nosotros somos / estamos", example: "We are friends" },
        { en: "They are", es: "Ellos son / están", example: "They are students" },
      ],
      tips: "💡 'To be' es la base del inglés. Úsalo todos los días.",
    },

    {
      title: "Daily Actions | Acciones Diarias",
      icon: <FaHome className="text-[#a87a64] mr-2" />,
      items: [
        { en: "I wake up", es: "Me despierto", example: "I wake up at 7 AM" },
        { en: "I eat breakfast", es: "Desayuno", example: "I eat breakfast every day" },
        { en: "I go to school", es: "Voy a la escuela", example: "I go to school by bus" },
        { en: "I work", es: "Trabajo", example: "I work in an office" },
        { en: "I sleep", es: "Duermo", example: "I sleep at 10 PM" },
      ],
      tips: "💡 Habla de tu rutina diaria usando estas frases.",
    },

    {
      title: "Basic Vocabulary | Vocabulario Básico",
      icon: <FaHome className="text-[#a87a64] mr-2" />,
      items: [
        { en: "House", es: "Casa", example: "This is my house" },
        { en: "Food", es: "Comida", example: "I like food" },
        { en: "Water", es: "Agua", example: "I drink water" },
        { en: "Friend", es: "Amigo", example: "He is my friend" },
        { en: "Book", es: "Libro", example: "I read a book" },
        { en: "School", es: "Escuela", example: "I go to school" },
      ],
      tips: "💡 Aprende palabras dentro de frases, no solas.",
    },

    {
      title: "Useful Phrases | Frases Útiles",
      icon: <FaCommentDots className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Thank you", es: "Gracias", example: "Thank you very much" },
        { en: "Please", es: "Por favor", example: "Please help me" },
        { en: "Sorry", es: "Lo siento", example: "Sorry for that" },
        { en: "Excuse me", es: "Disculpa", example: "Excuse me!" },
        { en: "I don't understand", es: "No entiendo", example: "I don't understand this" },
        { en: "Can you help me?", es: "¿Me puedes ayudar?", example: "Can you help me please?" },
      ],
      tips: "💡 Estas frases te hacen sonar más natural y educado.",
    },

    {
      title: "Questions | Preguntas Básicas",
      icon: <FaCommentDots className="text-[#a87a64] mr-2" />,
      items: [
        { en: "What is your name?", es: "¿Cómo te llamas?", example: "What is your name?" },
        { en: "Where are you from?", es: "¿De dónde eres?", example: "Where are you from?" },
        { en: "How are you?", es: "¿Cómo estás?", example: "How are you?" },
        { en: "How old are you?", es: "¿Cuántos años tienes?", example: "How old are you?" },
        { en: "Do you speak English?", es: "¿Hablas inglés?", example: "Do you speak English?" },
      ],
      tips: "💡 Las preguntas son clave para conversaciones reales.",
    },

    {
      title: "Numbers & Days | Números y Días",
      icon: <FaHashtag className="text-[#a87a64] mr-2" />,
      items: [
        { en: "One, Two, Three", es: "Uno, Dos, Tres", example: "I have two cats" },
        { en: "Monday", es: "Lunes", example: "See you on Monday" },
        { en: "Tuesday", es: "Martes", example: "Today is Tuesday" },
        { en: "Friday", es: "Viernes", example: "Today is Friday" },
        { en: "Sunday", es: "Domingo", example: "Sunday is rest day" },
      ],
      tips: "💡 Los días siempre llevan mayúscula en inglés.",
    },

    {
      title: "Food | Comida",
      icon: <FaHome className="text-[#a87a64] mr-2" />,
      items: [
        { en: "Rice", es: "Arroz", example: "I eat rice every day" },
        { en: "Chicken", es: "Pollo", example: "I like chicken" },
        { en: "Bread", es: "Pan", example: "I eat bread" },
        { en: "Milk", es: "Leche", example: "I drink milk" },
        { en: "Water", es: "Agua", example: "I drink water" },
      ],
      tips: "💡 La comida aparece en todas las conversaciones.",
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-sm"
        >
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