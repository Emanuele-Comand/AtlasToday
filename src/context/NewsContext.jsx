import React, { useReducer } from "react";
import { NewsContext } from "./NewsContext";

const initialState = {
  category: "",
  articles: [],
  saved: [],
  theme: "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_ARTICLES":
      return { ...state, articles: action.payload };
    case "TOGGLE_SAVE": {
      const saved = state.saved.includes(action.payload)
        ? state.saved.filter((a) => a !== action.payload)
        : [...state.saved, action.payload];
      return { ...state, saved };
    }
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export function NewsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
}
