import React from "react";

interface DateInputProps {
  value?: string; // YYYY-MM-DD or empty
  onDateChange: (year: number, month: number, day: number | null) => void;
  className?: string;
  ariaLabel?: string;
}

export default function DateInput({ value = "", onDateChange, className = "", ariaLabel }: DateInputProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => {
        const val = e.target.value; // "" or "YYYY-MM-DD"
        if (!val) {
          onDateChange(new Date().getFullYear(), new Date().getMonth() + 1, null);
          return;
        }
        const [y, m, d] = val.split("-").map(Number);
        onDateChange(y, m, d);
      }}
      aria-label={ariaLabel}
      className={
        `w-full h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ` +
        className
      }
    />
  );
}