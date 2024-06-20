import React from "react";

const PagginationNav = ({ totalPages, currentPage, handleGoToPage }) => {
  return (
    <ul className="nav nav-pills">
      {new Array(totalPages).fill(0).map((_, index) => (
        <li key={index}>
          <button
            className={
              currentPage === index + 1
                ? "btn btn-info ms-1"
                : "btn btn-outline-info ms-1"
            }
            onClick={() => handleGoToPage(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PagginationNav;
