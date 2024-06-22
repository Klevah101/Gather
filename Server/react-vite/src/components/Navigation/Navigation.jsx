import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";


function Navigation() {

  return (
    <div className="hidden-navigation">
    <ul className="navigation-menu">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/serverbar">serverbar</NavLink>
      </li>
      <li>😀</li>

      <li>
        <ProfileButton />
      </li>
    </ul>
      
    </div>
  );
}

export default Navigation;
