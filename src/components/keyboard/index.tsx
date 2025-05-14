import React, { useEffect, useState } from "react";

const keys = [
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
  ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["caps lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "enter"],
  ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift", "ctrl"],
  ["ctrl", "alt", "cmd", "space", "cmd", "alt"],
];
const KeyBoard = () => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
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
  return (
    <div className="bg-gray-200 p-8 rounded-lg  mx-auto">
      <div className="flex flex-col gap-3">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((key, keyIndex) => {
              const isActive = key.toLowerCase() === pressedKey?.toLowerCase();
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
  );
};

export default KeyBoard;
