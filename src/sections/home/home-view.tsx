import React, { useEffect, useState } from "react";
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

  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const keys = [
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
    ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    [
      "caps lock",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ";",
      "'",
      "enter",
    ],
    [
      "shift",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      ",",
      ".",
      "/",
      "shift",
      "ctrl",
    ],
    ["ctrl", "alt", "cmd", "space", "cmd", "alt"],
  ];
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      setPressedKey(key === " " ? "space" : key);
    };

    const handleKeyUp = () => setPressedKey(null);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
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

      {/*  */}
      <div className="bg-gray-200 p-8 rounded-lg  mx-auto">
        <div className="flex flex-col gap-3">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((key, keyIndex) => {
                const isActive =
                  key.toLowerCase() === pressedKey?.toLowerCase();
                return (
                  <div
                    key={keyIndex}
                    className={`flex items-center justify-center rounded-lg shadow-md px-4 py-2 font-mono text-lg select-none ${
                      key === "space" ? "w-[400px]" : ""
                    } ${isActive ? "bg-green-500 text-white" : "bg-white text-gray-800"}`}
                  >
                    {key === "space" ? "␣" : key}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
