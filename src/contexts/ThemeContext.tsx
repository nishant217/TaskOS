import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeObject = {
  background: string;
  cardBg: string;
  cardBgAlt: string;
  border: string;
  textPrimary: string;
  textMuted: string;
  primary: string;
};

type ThemeContextShape = {
  theme: ThemeObject;
  isTransitioning: boolean;
  setTheme: (t: Partial<ThemeObject>) => void;
  toggleTheme: () => void;
};

const defaultLight: ThemeObject = {
  background: '#e8f7ef',
  cardBg: '#ffffff',
  cardBgAlt: '#def1dd',
  border: '#cfe9d6',
  textPrimary: '#0b3b2c',
  textMuted: '#476a58',
  primary: '#4ba3ff',
};

// New dark theme matching the attached admin/dashboard image
const defaultDark: ThemeObject = {
  background: '#0F172A', // deep navy (default now)
  cardBg: '#1E293B', // dark card background
  cardBgAlt: '#0b1220',
  border: '#334155',
  textPrimary: '#F8FAFC', // light bluish text
  textMuted: '#94A3B8', // muted slate
  primary: '#38BDF8', // bright blue accent
};

const ThemeContext = createContext<ThemeContextShape | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // default to dark theme unless a previous selection exists in localStorage
  const [theme, setThemeState] = useState<ThemeObject>(() => {
    try {
      const stored = localStorage.getItem('theme_object');
      return stored ? JSON.parse(stored) : defaultDark;
    } catch {
      return defaultDark;
    }
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('theme_object', JSON.stringify(theme));
    } catch {}
  }, [theme]);

  // Apply theme values to CSS variables so styles and Tailwind utilities can use them
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.style.setProperty('--theme-background', theme.background);
      root.style.setProperty('--theme-card-bg', theme.cardBg);
      root.style.setProperty('--theme-card-bg-alt', theme.cardBgAlt || theme.cardBg);
      root.style.setProperty('--theme-border', theme.border);
      root.style.setProperty('--theme-card-border', theme.border);
      root.style.setProperty('--theme-text-primary', theme.textPrimary);
      root.style.setProperty('--theme-text-muted', theme.textMuted);
      root.style.setProperty('--theme-accent', theme.primary);
      // ensure inverse and shadow defaults exist
      if (!getComputedStyle(root).getPropertyValue('--theme-text-inverse')) {
        root.style.setProperty('--theme-text-inverse', '#ffffff');
      }
      // set shadow appropriate for dark look
      root.style.setProperty('--theme-shadow', '0 8px 24px rgba(2,6,23,0.6)');
    } catch (e) {
      // ignore in non-DOM environments
    }
  }, [theme]);

  const setTheme = (t: Partial<ThemeObject>) => setThemeState((s) => ({ ...s, ...t }));
  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 250);
    setThemeState((s) => {
      // If currently dark (approx), switch to light
      const isDark = s.background && s.background.startsWith('#0');
      return isDark ? defaultLight : defaultDark;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, isTransitioning, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export default ThemeContext;
