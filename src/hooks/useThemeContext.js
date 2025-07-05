import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext deve essere usato all'interno di un ThemeProvider"
    );
  }
  return context;
};
