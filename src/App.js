import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApplicationContext } from "./backend/ProductRepository.js";

function App() {
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const pathWithoughtSlash = path.slice(1, path.length);
    setCurrentRoute(pathWithoughtSlash);
  }, []);

  return (
    <ApplicationContext.Provider>
      <BrowserRouter>
        <nav className="m-1 p-1 border-info">
          <ul className="nav nav-pills">
            <li>
              <Link
                onClick={() => setCurrentRoute("home")}
                className={
                  currentRoute === "home"
                    ? "btn btn-info ms-1"
                    : "btn btn-outline-info ms-1"
                }
                to="/home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setCurrentRoute("products")}
                className={
                  currentRoute === "products"
                    ? "btn btn-info ms-1"
                    : "btn btn-outline-info ms-1"
                }
                to="/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setCurrentRoute("newProduct")}
                className={
                  currentRoute === "newProduct"
                    ? "btn btn-info ms-1"
                    : "btn btn-outline-info ms-1"
                }
                to="/newProduct"
              >
                New Product
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ApplicationContext.Provider>
  );
}

export default App;
