import { Link, useLocation } from "react-router-dom";
import logo from "../assets/atlas_today_logo.png";
import Searchbar from "./Searchbar";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar bg-white p-4">
      <div className="text-slate-700 flex justify-between items-center">
        <Link to="/src/pages/Home.jsx" className="">
          <img src={logo} alt="logo" className="w-10 h-10" />
        </Link>
        <ul className="flex gap-4">
          <li className="nav-item">
            <Link
              to="/"
              className="relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              General
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className="relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              Business
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className="relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              Entertainment
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className={`relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              Health
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className="relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              Science
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className="relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              Sports
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              className="relative transition-all duration-300 hover:text-slate-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all after:duration-300 hover:after:w-full"
            >
              Technology
            </Link>
          </li>
        </ul>
        <Searchbar />
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Navbar;
