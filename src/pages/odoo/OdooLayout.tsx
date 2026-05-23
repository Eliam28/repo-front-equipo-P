import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import OdooNavbar from "../../layout/OdooNavbar";

function OdooLayout() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main>
        <OdooNavbar />
        <Outlet />
      </main>
    </div>
  );
}

export default OdooLayout;