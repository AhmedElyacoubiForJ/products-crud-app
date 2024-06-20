import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct.js";
import { ProductsContext, useAppState } from "./context/ProductsContext.js";
import AppNavbar from "./components/AppNavbar.js";

function App() {
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const pathWithoughtSlash = path.slice(1, path.length);
    setCurrentRoute(pathWithoughtSlash);
  }, []);

  return (
    <ProductsContext.Provider value={useAppState()}>
      <BrowserRouter>
        <AppNavbar />
        {/* <nav className="m-1 p-1 border-info navbar navbar-expand-lg navbar-light bg-light">
          <ul className="nav nav-pills">
            <NavBarItem to="home" currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} text="Home" />
            <NavBarItem to="products" currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} text="Products"/>
            <NavBarItem to="newProduct" currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} text="New Product"/>
          </ul>
          <ul className="nav navbar-nav">
            <li>
              <ProductsInfo />
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ProductsContext.Provider>
  );
}

export default App;
