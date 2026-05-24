import { Outlet } from "react-router-dom";

import Sidebar from "../../layout/Sidebar";
import WordpressNavbar from "../../layout/WordpressNavbar";

function WordpressLayout() {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <WordpressNavbar />

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default WordpressLayout;