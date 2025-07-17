import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/atlas_today_logo.png";
import ToggleTheme from "./ToggleTheme";
import { useCategoryContext } from "../context/CategoryContext";

const Navbar = () => {
  const { categories, changeCategory } = useCategoryContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId) => {
    changeCategory(categoryId);
    setIsMenuOpen(false); // Chiudi il menu mobile dopo la selezione
  };

  // Chiudi il menu quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="navbar bg-white dark:bg-gray-900 p-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="text-slate-700 dark:text-slate-300 flex justify-between items-center">
        <Link to="/" className="">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-md" />
        </Link>

        {/* Menu desktop - nascosto su mobile */}
        <ul className="hidden md:flex gap-4">
          {categories.map((category) => (
            <li key={category.id} className="nav-item">
              <button
                onClick={() => changeCategory(category.id)}
                className="cursor-pointer relative transition-all duration-300 hover:text-slate-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Controlli desktop */}
        <div className="hidden md:flex items-center gap-2">
          <ToggleTheme />
        </div>

        {/* Menu hamburger mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ToggleTheme />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <span className="material-icons text-[24px]">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col p-4 space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
