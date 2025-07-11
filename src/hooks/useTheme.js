import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme deve essere usato all'interno di un ThemeProvider"
    );
  }
  return context;
};
