import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentRoute, setCurrentRoute] = useState("");

  useEffect(() => {
  const path = window.location.pathname;
  //console.log(path.slice(1, path.length))
  setCurrentRoute(path.slice(1, path.length));
  }, []);

  return (
    <BrowserRouter>
      <nav className="m-1 p-1 border-info">
        <ul className="nav nav-pills">
          <li>
            <Link
              onClick={() => setCurrentRoute("Home")}
              className={
                currentRoute === "Home"
                  ? "btn btn-info ms-1"
                  : "btn btn-outline-info ms-1"
              }
              to="/Home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setCurrentRoute("Products")}
              className={
                currentRoute === "Products"
                  ? "btn btn-info ms-1"
                  : "btn btn-outline-info ms-1"
              }
              to="/Products"
            >
              Products
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
