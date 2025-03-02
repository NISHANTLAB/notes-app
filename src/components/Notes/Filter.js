import React from "react";

const Filter = ({ setFilterCategory }) => {
  return (
    <div className="filter">
      <input type="text" placeholder="Filter by category" onChange={(e) => setFilterCategory(e.target.value)} />
    </div>
  );
};

export default Filter;
