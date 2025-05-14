import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const textToType = [
  "aqa qaq j ju juj uju just aqua",
  "quest cons toughs sequence thoughtless",
  "staunch ghosts summer pounce afoul",
  "differentiated haircut",
];

const HomeView: React.FC = () => {
  const [currentText, setCurrentText] = useState(textToType[0]);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key === " " ? " " : event.key;
      const nextChar = currentText[typedText.length];

      // Nếu gõ sai, không cho gõ tiếp nhưng vẫn cho sửa lỗi
      if (errorIndex === null || typedText.length === errorIndex) {
        if (key === nextChar) {
          setTypedText((prev) => prev + key);
          setActiveKey(key);
          setErrorIndex(null);

          if (typedText.length + 1 === currentText.length) {
            const nextIndex = (currentIndex + 1) % textToType.length;
            setCurrentIndex(nextIndex);
            setCurrentText(textToType[nextIndex]);
            setTypedText("");
            setAccuracy(100);
          }
        } else {
          setErrorIndex(typedText.length);
        }

        const newAccuracy = Math.round(
          ((typedText.length + 1) / currentText.length) * 100
        );
        setAccuracy(newAccuracy);
      }
    };

    const handleKeyUp = () => setActiveKey(null);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentText, typedText, currentIndex, errorIndex]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-3/4">
        <h1 className="text-3xl font-bold mb-4 text-center">Typing Practice</h1>
        <p className="text-2xl font-mono mb-8 text-center">
          {currentText.split("").map((char, index) => {
            const typedChar = typedText[index] || "";
            let className = "text-gray-500";
            if (typedChar === char) className = "text-green-500";
            else if (index === errorIndex) className = "text-red-500";
            else if (index === typedText.length)
              className = "text-blue-500 underline";
            return (
              <span key={index} className={className}>
                {char === " " && index === errorIndex ? "_" : char}
              </span>
            );
          })}
        </p>
        <p className="text-center text-lg">Accuracy: {accuracy}%</p>
      </div>
      <div className="flex mt-10">
        {"abcdefghijklmnopqrstuvwxyz ".split("").map((key) => (
          <motion.div
            key={key}
            className={`m-1 p-3 w-10 h-10 bg-gray-200 rounded-md text-center ${key === activeKey ? "bg-blue-400" : ""}`}
          >
            {key === " " ? "_" : key}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
