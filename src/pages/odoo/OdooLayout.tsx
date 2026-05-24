import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import OdooNavbar from "../../layout/OdooNavbar";

function OdooLayout() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0, // ← ESTA ES LA CLAVE
        }}
      >
        <OdooNavbar />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OdooLayout;