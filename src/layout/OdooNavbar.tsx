import { NavLink } from "react-router-dom";

function OdooNavbar() {
  return (
    <nav className="topnav">
      <NavLink to="/odoo/products">Productos</NavLink>
      <NavLink to="/odoo/orders">Órdenes</NavLink>
      <NavLink to="/odoo/providers">Proveedores</NavLink>
      <NavLink to="/odoo/categories">Categorías</NavLink>
    </nav>
  );
}

export default OdooNavbar;