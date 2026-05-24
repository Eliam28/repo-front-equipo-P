import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { OdooPage } from "./pages/OdooPage.tsx";
import { PlaceholderPage } from "./pages/PlaceholderPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/odoo" element={<OdooPage />} />
        <Route
          path="/prestashop"
          element={<PlaceholderPage title="Prestashop" />}
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
