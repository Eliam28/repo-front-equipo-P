import { Routes, Route, Navigate } from "react-router-dom";

import OdooLayout from "./pages/odoo/OdooLayout";
import PrestashopLayout from "./pages/prestashop/PrestashopLayout";

import Products from "./pages/odoo/Products";
import Orders from "./pages/odoo/Orders";
import Providers from "./pages/odoo/Providers";
import Categories from "./pages/odoo/Categories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/odoo/products" />} />

      <Route path="/odoo" element={<OdooLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="providers" element={<Providers />} />
        <Route path="categories" element={<Categories />} />
      </Route>

      <Route path="/prestashop" element={<PrestashopLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<h1>Prestashop Productos</h1>} />
      </Route>
    </Routes>
  );
}

export default App;