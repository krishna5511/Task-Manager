import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";

import { FaHome, FaTasks, FaUser, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    title: "My Tasks",
    path: "/tasks",
    icon: FaTasks,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: FaUser,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <img src={logo} alt="Task Manager Logo" />
          <h2>Task Manager</h2>
        </div>

        <nav className="menu">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menuItem active" : "menuItem"
                }
              >
                <Icon className="menuIcon" />

                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="bottom">
        <div className="userInfo">
          <h4>{user?.name}</h4>

          <p>{user?.email}</p>
        </div>

        <button className="logoutBtn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
