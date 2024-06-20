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
