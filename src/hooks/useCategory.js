import { useState } from "react";

const useCategory = () => {
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

  return {
    selectedCategory,
    categories,
    changeCategory,
  };
};

export default useCategory;
