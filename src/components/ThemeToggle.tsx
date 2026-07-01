import { useTheme } from "~/hooks/useTheme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`border-border hover:bg-muted relative flex h-10 w-10 items-center justify-center rounded-full border transition ${className}`}
    >
      <span className="text-lg" aria-hidden="true">
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
