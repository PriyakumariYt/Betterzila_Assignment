import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../ContextApi/TokenApi";
import DarkModeToggle from "./DarkmodeToggle";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const { showMenu } = useAuth();

  return (
    <>
      <nav className="header-2">
        <div className="nav-links" id="navlinks">
          <ul>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/"> SignUp </NavLink>
                </li>
                <li>
                  <NavLink to="/login">SignIn</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <i id="menu-bar" className="fas fa-bars" onClick={showMenu}></i>
        <DarkModeToggle />
      </nav>
    </>
  );
};

export default Navbar;
