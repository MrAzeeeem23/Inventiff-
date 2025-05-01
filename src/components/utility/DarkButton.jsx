import useDarkMode from "./DarkMode.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function DarkModeToggle() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? (
        <i class="bi bi-moon-stars-fill"></i>
      ) : (
        <i class="bi bi-brightness-high-fill"></i>
      )}
    </button>
  );
}