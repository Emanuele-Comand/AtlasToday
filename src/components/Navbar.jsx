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
    <nav className="navbar bg-white dark:bg-gray-900 px-4 py-3 fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 shadow-sm">
      <div className="text-slate-700 dark:text-slate-300 flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
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
        <div className="md:hidden flex items-center gap-3">
          <ToggleTheme />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors duration-200 shadow-sm"
            aria-label="Toggle menu"
          >
            <span className="material-icons text-[24px] text-gray-700 dark:text-gray-800">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {/* Menu mobile overlay */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <ul className="flex flex-col py-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
