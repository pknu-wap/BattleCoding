import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="SearchBar" role="search">
      <span className="SearchBar_input">
        <input
          type="search"
          aria-label="검색창"
          placeholder="검색어를 입력해 주세요"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="Search_button" onClick={handleSearch}>
          <span>검색</span>
        </button>
      </span>
    </div>
  );
}

export default SearchBar;
