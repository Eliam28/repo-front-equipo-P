import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import OdooNavbar from "../../layout/OdooNavbar";

function OdooLayout() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <OdooNavbar />

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default OdooLayout;