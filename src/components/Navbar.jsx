import { Link } from "react-router-dom";
import logo from "../assets/atlas_today_logo.png";
import ToggleTheme from "./ToggleTheme";
import { useCategoryContext } from "../context/CategoryContext";

const Navbar = () => {
  const { categories, changeCategory } = useCategoryContext();

  return (
    <nav className="navbar bg-white dark:bg-gray-900 p-4 fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="text-slate-700 dark:text-slate-300 flex justify-between items-center">
        <Link to="/" className="">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-md" />
        </Link>
        <ul className="flex gap-4">
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
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Navbar;
