import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext deve essere usato all'interno di CategoryProvider"
    );
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("general");

  const categories = [
    { id: "general", name: "General" },
    { id: "business", name: "Business" },
    { id: "entertainment", name: "Entertainment" },
    { id: "health", name: "Health" },
    { id: "science", name: "Science" },
    { id: "sports", name: "Sports" },
    { id: "technology", name: "Technology" },
  ];

  const changeCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const value = {
    selectedCategory,
    categories,
    changeCategory,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
