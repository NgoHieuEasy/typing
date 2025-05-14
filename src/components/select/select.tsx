import React, { useState, useEffect, useRef } from "react";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";

type Option = {
  label: string;
  value: string ;
};

type Props = {
  options: Option[];
  value: string ;
  onChange?: (value: string ) => void;
  InputProps?: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };
  placeholder?: string;
};

export function Select({
  options,
  value,
  onChange,
  InputProps,
  placeholder = "-- Chọn --",
}: Props) {
  const { isDarkStore } = useDarkModeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<string | number>(
    value ?? options?.[0]?.value
  );

  // Cập nhật khi props.value thay đổi từ bên ngoài
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (val: string ) => {
    setSelectedValue(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl bg-gray-100 text-gray-700 cursor-pointer
          ${isDarkStore ? "border border-neutrals-500" : "border border-neutrals-300"}
        `}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {InputProps?.startAdornment && (
            <div className="flex items-center">{InputProps.startAdornment}</div>
          )}
          <span className="text-sm">
            {selectedOption?.label || (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
        </div>
        {InputProps?.endAdornment && <div>{InputProps.endAdornment}</div>}
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full mt-1 z-10 bg-white dark:bg-neutral-900 border rounded-xl shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:text-black text-black  dark:text-white
               
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
