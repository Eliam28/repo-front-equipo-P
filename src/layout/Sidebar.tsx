import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <Link
        className={location.pathname.includes("/odoo") ? "active" : ""}
        to="/odoo/products"
      >
        Odoo
      </Link>

      <Link
        className={location.pathname.includes("/prestashop") ? "active" : ""}
        to="/prestashop/products"
      >
        Prestashop
      </Link>

      <Link
        className={location.pathname.includes("/wordpress") ? "active" : ""}
        to="/wordpress/products"
      >
        Wordpress
      </Link>
    </aside>
  );
}

export default Sidebar;