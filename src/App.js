import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
      <BrowserRouter>
        <nav className='m-1 p-1 border-info'>
          <ul className='nav nav-pills'>
            <li>
              <Link className='btn btn-outline-info ms-1' to='/Home'>Home</Link>
            </li>
            <li>
              <Link className='btn btn-outline-info ms-1' to='/Products'>Products</Link>
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
