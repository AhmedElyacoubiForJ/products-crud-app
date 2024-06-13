import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentRoute, setCurrentRoute] = useState("");
  return (
    <BrowserRouter>
      <nav className="m-1 p-1 border-info">
        <ul className="nav nav-pills">
          <li>
            <Link
              className={
                currentRoute == "Home"
                  ? "btn btn-info ms-1"
                  : "btn btn-outline-info ms-1"
              }
              to="/Home"
              onClick={() => setCurrentRoute('Home')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link className={
                currentRoute == "Products"
                  ? "btn btn-info ms-1"
                  : "btn btn-outline-info ms-1"
              }
              to="/Products"
              onClick={() => setCurrentRoute('Products')}
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
