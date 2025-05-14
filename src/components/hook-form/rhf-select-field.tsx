import React, { useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  options: Option[];
  InputProps?: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };
  InputLabelProps?: {
    shrink?: boolean;
  };
  placeholder?: string;
};

export function RHFSelect({
  name,
  label,
  helperText,
  options,
  InputProps,
  InputLabelProps,
  placeholder = "-- Chọn --",
}: Props) {
  const { control } = useFormContext();
  const { isDarkStore } = useDarkModeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        return (
          <div className="flex flex-col gap-1 w-full" ref={ref}>
            {label && (
              <label
                className={`text-base font-medium ${
                  InputLabelProps?.shrink ? "text-[#343A40]" : "text-gray-800"
                } mb-2 dark:text-white`}
              >
                {label}
              </label>
            )}

            <div className="relative w-full">
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-xl bg-gray-100 text-gray-700 cursor-pointer
                ${isDarkStore ? "border border-neutrals-500" : "border border-neutrals-300"}
                ${error ? "border-red-500" : ""}
              `}
                onClick={() => setOpen(!open)}
              >
                <div className="flex items-center gap-2">
                  {InputProps?.startAdornment && (
                    <div className="flex items-center">
                      {InputProps.startAdornment}
                    </div>
                  )}
                  <span className="text-sm">
                    {selectedOption?.label || (
                      <span className="text-gray-400">{placeholder}</span>
                    )}
                  </span>
                </div>
                {InputProps?.endAdornment && (
                  <div>{InputProps.endAdornment}</div>
                )}
              </div>

              {open && (
                <div className="absolute top-full left-0 w-full mt-1 z-10 bg-white dark:bg-neutral-900 border rounded-xl shadow-lg max-h-60 overflow-auto">
                  {options.map((opt) => (
                    <div
                      key={opt.value}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        field.onChange(opt.value);
                        setOpen(false);
                      }}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span className="text-red-500 text-sm">
              {error?.message ?? helperText}
            </span>
          </div>
        );
      }}
    />
  );
}
