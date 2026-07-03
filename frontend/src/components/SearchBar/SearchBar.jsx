import "./SearchBar.css";

import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search tasks...",
}) => {
  return (
    <div className="searchBar">

      <FaSearch className="searchIcon" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

    </div>
  );
};

export default SearchBar;