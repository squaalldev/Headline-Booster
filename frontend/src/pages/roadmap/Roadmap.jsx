import { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import LevelA1 from "./LevelA1";
import LevelA2 from "./LevelA2";
import LevelB1 from "./LevelB1";
import LevelB2 from "./LevelB2";

export default function Roadmap() {
  const [level, setLevel] = useState("A1");

  useEffect(() => {
    document.title = "Roadmap | CompartirAI - Aprende inglés A1 → B2";
  }, []);

  const levels = {
    A1: { title: "Beginner (A1)", component: <LevelA1 /> },
    A2: { title: "Elementary (A2)", component: <LevelA2 /> },
    B1: { title: "Intermediate (B1)", component: <LevelB1 /> },
    B2: { title: "Upper Intermediate (B2)", component: <LevelB2 /> },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800 dark:text-white min-h-screen">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaBook className="text-[#a87a64]" />
          English Roadmap
        </h1>
        <a href="/chat" className="text-sm text-[#a87a64] hover:underline">
          ← Volver
        </a>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.keys(levels).map((key) => (
          <button
            key={key}
            onClick={() => setLevel(key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              level === key
                ? "bg-gradient-to-r from-[#a87a64] to-[#6e4433] text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {key} - {levels[key].title}
          </button>
        ))}
      </div>

      <div>{levels[level].component}</div>
    </div>
  );
}