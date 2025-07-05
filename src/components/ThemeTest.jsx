import { useTheme } from "../hooks/useTheme.js";

const ThemeTest = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="fixed top-20 right-4 z-50 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
      <p className="text-sm text-gray-900 dark:text-white mb-2">
        Dark Mode: {darkMode ? "ON" : "OFF"}
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
        HTML class:{" "}
        {document.documentElement.classList.contains("dark") ? "dark" : "light"}
      </p>
      <button
        onClick={toggleTheme}
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm mb-2"
      >
        Toggle Theme
      </button>

      {/* Test elements */}
      <div className="mt-4 space-y-2">
        <div className="w-20 h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"></div>
        <div className="w-20 h-8 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"></div>
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"></div>
        <div className="w-20 h-8 test-dark-mode border border-gray-300"></div>
      </div>
    </div>
  );
};

export default ThemeTest;
