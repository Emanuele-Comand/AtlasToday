import { IconButton } from "@material-tailwind/react";
import { useTheme } from "../hooks/useTheme.js";

const ToggleTheme = () => {
  const { darkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log("ToggleTheme clicked, current darkMode:", darkMode);
    toggleTheme();
  };

  return (
    <IconButton
      variant="text"
      onClick={handleToggle}
      className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      <span className="material-icons pt-1 text-[24px]">
        {darkMode ? "light_mode" : "dark_mode"}
      </span>
    </IconButton>
  );
};

export default ToggleTheme;
