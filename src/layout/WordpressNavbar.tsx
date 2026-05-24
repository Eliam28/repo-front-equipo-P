import { NavLink } from "react-router-dom";

function WordpressNavbar() {
  return (
    <nav className="topnav">
      <NavLink to="/wordpress/products">
        Productos
      </NavLink>
    </nav>
  );
}

export default WordpressNavbar;