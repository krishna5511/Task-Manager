import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboardLayout">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="mainContent">

        <Navbar />

        <main className="pageContent">

          <Outlet />

        </main>
        

  <Footer />

      </div>

    </div>
  );
};

export default DashboardLayout;