import Sidebar from "../../layout/Sidebar";
import PrestashopNavbar from "../../layout/PrestashopNavbar";
import { Outlet } from "react-router-dom";

function PrestashopLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <PrestashopNavbar />
        <Outlet />
      </main>
    </div>
  );
}

export default PrestashopLayout;