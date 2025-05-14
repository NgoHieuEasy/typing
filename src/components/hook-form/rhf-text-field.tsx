import { useFormContext, Controller } from "react-hook-form";
import React from "react";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type Props = InputProps & {
  name: string;
  label?: string;
  helperText?: string;
  InputProps?: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };
  InputLabelProps?: {
    shrink?: boolean;
  };
};

export function RHFTextField({
  name,
  label,
  helperText,
  InputProps,
  InputLabelProps,
  ...other
}: Props) {
  const { control } = useFormContext();
  const { isDarkStore } = useDarkModeStore();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1 w-full">
          {label && (
            <label
              className={`text-sm font-medium ${
                InputLabelProps?.shrink ? "text-gray-500" : "text-gray-800"
              }`}
            >
              {label}
            </label>
          )}
          <div className="relative w-full ">
            {InputProps?.startAdornment && (
              <div className="absolute inset-y-0 left-2 flex items-center">
                {InputProps.startAdornment}
              </div>
            )}
            <input
              {...field}
              {...other}
              className={`w-full px-4 py-3 rounded-xl bg-gray-100  text-gray-700 placeholder-gray-400
    focus:outline-none focus:border-transparent
    ${
      isDarkStore
        ? error
          ? "border border-red-500"
          : "border border-neutrals-500"
        : error
          ? "border border-red-500"
          : "border border-neutrals-300"
    }
    ${InputProps?.startAdornment ? "pl-8" : ""}
    ${InputProps?.endAdornment ? "pr-8" : ""}
  `}
              autoComplete="off"
            />

            {InputProps?.endAdornment && (
              <div className="absolute inset-y-0 right-2 flex items-center">
                {InputProps.endAdornment}
              </div>
            )}
          </div>
          <span className="text-red-500 text-sm">
            {error?.message ?? helperText}
          </span>
        </div>
      )}
    />
  );
}
