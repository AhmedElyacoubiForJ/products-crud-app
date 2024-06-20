import React, { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { ProductsContext } from "../context/ProductsContext";

const SearchForm = ({ handleGetProductsPaginated }) => {
  const [searchText, setSearchText] = useState("");
  const [appState, setAppState] = useContext(ProductsContext);

  const handleSearch = (e) => {
    e.preventDefault();
    handleGetProductsPaginated(searchText, 1, appState.pageSize);
  };

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <div className="row g-2">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
