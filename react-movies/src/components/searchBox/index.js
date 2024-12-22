// SearchBox.js
import React from "react";

function SearchBox({ query, handleSearchChange }) {
  return (
    <input
      type="text"
      value={query}
      onChange={handleSearchChange}
      placeholder="Search for movies..."
      style={{
        width: "80%",
        maxWidth: "900px",
        padding: "20px",
        fontSize: "25px",
        borderRadius: "8px",
        border: "1px solid",
      }}
    />
  );
}

export default SearchBox;
