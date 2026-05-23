import { NavLink } from "react-router-dom";

function PrestashopNavbar() {
  return (
    <nav className="topnav">
      <NavLink to="/prestashop/products">Productos</NavLink>
    </nav>
  );
}

export default PrestashopNavbar;