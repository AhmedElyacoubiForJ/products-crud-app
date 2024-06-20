import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteProduct,
  updateCheckProduct,
  getProductsPaginated,
} from "../backend/ProductRepository";

import { ProductsContext } from "../context/ProductsContext";

import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [appState, setAppState] = useContext(ProductsContext);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    handleGetProductsPaginated(appState.keyword, appState.currentPage, appState.pageSize);
  }, []);

  const getTotalPages = (resp, size) => {
    const totalElements = resp.headers.get("X-Total-Count");
    let totalPages = Math.floor(totalElements / size);
    if (totalElements % size !== 0) {
      totalPages = totalPages + 1;
    }
    return totalPages;
  }

  const handleGetProductsPaginated = (keyword, page, size) => {
    getProductsPaginated(keyword, page, size)
      .then((resp) => {
        const totalPages = getTotalPages(resp, size);

        setAppState({
          ...appState,
          products: resp.data,
          totalPages: totalPages,
          currentPage: page,
          keyword: keyword,
          pageSize: size
        });
      })
      .catch((err) => console.log(err));
  };

  const handleCheckProduct = (product) => {
    // update DB
    updateCheckProduct(product)
      .then((resp) => {
        // update UI
        const newProducts = appState.products.map((p) => {
          if (p.id === product.id) {
            p.checked = !p.checked;
          }
          return p;
        });
        setAppState({ ...appState, products: newProducts });
      })
      .catch((err) => console.log(err));
  };

  const handleGoToPage = (page) => {
    handleGetProductsPaginated(appState.keyword, page, appState.pageSize);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleGetProductsPaginated(searchText, 1, appState.pageSize);
  };

  const handleDeleteProduct = (id) => {
    // update DB
    deleteProduct(id)
      .then((resp) => {
        // update UI
        const newProducts = appState.products.filter((product) => product.id !== id);
        setAppState({ ...appState, products: newProducts });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-1 m-1">
      <div className="row">
        <div className="col-md-6">
          <div className="card mt-1">
            <div className="card-body">
              <form onSubmit={(e) => handleSearch(e)}>
                <div className="row g-2">
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-success">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card mt-1">
            <div className="card-header">
              <h5>Products</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Checked</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appState.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          onClick={() => handleCheckProduct(product)}
                          className="btn btn-outline-success"
                        >
                          <FontAwesomeIcon
                            icon={product.checked ? faCheckCircle : faCircle}
                          ></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="btn btn-outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                        <button
                          onClick={() => navigate(`/editProduct/${product.id}`)}
                          className="btn btn-outline-success m-2"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="nav nav-pills">
                {new Array(appState.totalPages).fill(0).map((_, index) => (
                  <li key={index}>
                    <button
                      className={
                        appState.currentPage === index + 1
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
