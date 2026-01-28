import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

type Option = { value: string; label: string };

export default function SelectDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handle = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // prefer opening downwards unless there's significantly more space above
      const preferUp = spaceBelow < 220 && spaceAbove > spaceBelow;
      setOpenUp(preferUp);
    };
    // initial compute
    handle();
    window.addEventListener('resize', handle);
    window.addEventListener('scroll', handle, true);
    return () => {
      window.removeEventListener('resize', handle);
      window.removeEventListener('scroll', handle, true);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full px-4 py-3 rounded-2xl transition-all focus:outline-none text-left flex items-center justify-between"
        style={{ backgroundColor: theme.cardBgAlt, border: `1px solid ${theme.border}`, color: value ? theme.textPrimary : theme.textMuted }}
      >
        <span>{value ? (options.find((o) => o.value === value)?.label || value) : placeholder}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 w-full py-1 rounded-2xl shadow-lg z-50 max-h-48 overflow-y-auto"
          style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, [openUp ? 'bottom' : 'top']: '100%' } as React.CSSProperties}
        >
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50"
              style={{ color: value === o.value ? theme.primary : theme.textPrimary }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
