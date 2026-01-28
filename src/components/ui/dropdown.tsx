import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface DropdownProps {
  value: string | number;
  onChange: (val: string | number) => void;
  options: Option[];
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export default function Dropdown({
  value,
  onChange,
  options,
  className = "",
  ariaLabel,
  disabled = false,
}: DropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => {
        if (disabled) return;
        const val = e.target.value;
        // try to convert numeric string to number
        const parsed = String(Number(val)) === val ? Number(val) : val;
        onChange(parsed);
      }}
      aria-label={ariaLabel}
      disabled={disabled}
      className={
        `w-full h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none ` +
        className +
        (disabled ? " opacity-60 cursor-not-allowed" : "")
      }
    >
      {options.map((o) => (
        <option key={String(o.value)} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}