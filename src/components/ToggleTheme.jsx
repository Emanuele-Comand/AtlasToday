import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <IconButton
      variant="text"
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-lg bg-gray-100 cursor-pointer text-gray-700:text-yellow-400"
    >
      <span className="material-icons pt-1 text-[24px]">
        {darkMode ? "light_mode" : "dark_mode"}
      </span>
    </IconButton>
  );
};

export default ToggleTheme;
