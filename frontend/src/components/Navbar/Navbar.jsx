import "./Navbar.css";

import {
  FaSearch,
  FaBell,
  FaChevronDown,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

  const { user } = useAuth();

  return (

    <header className="navbar">

      {/* Search */}

      <div className="searchContainer">

        <FaSearch className="searchIcon" />

        <input
          type="text"
          placeholder="Search task..."
        />

      </div>

      {/* Right */}

      <div className="rightSection">

        
        <div className="profile">

          <img
            src={
              user?.profileImage?.url ||
              "https://i.pravatar.cc/100"
            }
            alt="profile"
          />

          <div className="profileInfo">

            <h4>{user?.name}</h4>

            <p>{user?.email}</p>

          </div>

          <FaChevronDown />

        </div>

      </div>

    </header>

  );

};

export default Navbar;