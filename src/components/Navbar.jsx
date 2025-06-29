import { Link } from "react-router-dom";
import logo from "../assets/atlas_today_logo.png";
import Searchbar from "./Searchbar";
import ToggleTheme from "./ToggleTheme";
import { useCategoryContext } from "../context/CategoryContext";

const Navbar = () => {
  const { categories, changeCategory } = useCategoryContext();

  return (
    <nav className="navbar bg-white p-4">
      <div className="text-slate-700 flex justify-between items-center">
        <Link to="/" className="">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <ul className="flex gap-4">
          {categories.map((category) => (
            <li key={category.id} className="nav-item">
              <button
                onClick={() => changeCategory(category.id)}
                className="cursor-pointer relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
        <Searchbar />
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Navbar;
