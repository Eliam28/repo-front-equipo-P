import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { OdooPage } from "./pages/OdooPage.tsx";
import { PlaceholderPage } from "./pages/PlaceholderPage.tsx";
import { PrestashopPage } from "./pages/PrestashopPage.tsx";
import { PrestashopProductPage } from "./pages/PrestashopProductPage.tsx";
import { PrestashopOrderPage } from "./pages/PrestashopOrderPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/odoo" element={<OdooPage />} />
        <Route path="/prestashop" element={<PrestashopPage />} />
        <Route
          path="/prestashop/productos/:reference"
          element={<PrestashopProductPage />}
        />

        <Route
          path="/prestashop/ordenes/:reference"
          element={<PrestashopOrderPage />}
        />

        <Route
          path="/wordpress"
          element={<PlaceholderPage title="WordPress" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
