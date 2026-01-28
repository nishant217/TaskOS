import { useTheme } from "../contexts/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-primary text-text-inverse"
    >
      Switch to {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
