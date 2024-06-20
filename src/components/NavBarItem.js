import React from "react";
import { Link } from "react-router-dom";

const NavBarItem = ({ to, currentRoute, setCurrentRoute, text, key }) => {
  return (
    <li key={key}>
      <Link
        onClick={() => setCurrentRoute(to)}
        className={
          currentRoute === to
            ? "btn btn-info ms-1"
            : "btn btn-outline-info ms-1"
        }
        to={`/${to}`}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavBarItem;
