import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const pathWithoughtSlash = path.slice(1, path.length);
    setCurrentRoute(pathWithoughtSlash);
  }, []);
  
  return (
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
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
