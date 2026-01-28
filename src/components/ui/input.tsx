import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
}

/**
 * Reusable Input with optional label.
 * - Keeps existing default styling used across the app.
 * - Use `label` prop to render a label above the input.
 */
export default function Input({
  label,
  required = false,
  labelClassName = "",
  wrapperClassName = "",
  id,
  className = "",
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;

  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium text-primary-header dark:text-green-500 mb-2 block ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={
          `w-full h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ` +
          className
        }
      />
    </div>
  );
}