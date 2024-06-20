import React, { useState, useEffect } from "react";

import NavBarItem from "./NavBarItem";
import ProductsInfo from "./ProductsInfo";

const AppNavbar = () => {
  const [currentRoute, setCurrentRoute] = useState("");
  const routeToText = new Map([
    ["home", "Home"],
    ["products", "Products"],
    ["newProduct", "New Product"],
  ]);

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const pathWithoughtSlash = path.slice(1, path.length);
    setCurrentRoute(pathWithoughtSlash);
  }, []);

  return (
    <nav className="m-1 p-1 border-info navbar navbar-expand-lg navbar-light bg-light">
      <ul className="nav nav-pills">
        {Array.from(routeToText.entries()).map(([to, text]) => (
          <NavBarItem
            to={to}
            currentRoute={currentRoute}
            setCurrentRoute={setCurrentRoute}
            text={text}
            key={to}
          />
        ))}
      </ul>
      <ProductsInfo />
    </nav>
  );
};

export default AppNavbar;
