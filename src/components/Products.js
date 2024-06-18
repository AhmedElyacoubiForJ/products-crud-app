import React, { useState, useEffect, useContext } from "react";
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
  getProductsPaginated
} from "../backend/ProductRepository";

import { ApplicationContext } from "../context/ProductsContext";

import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [appState, setAppState] = useContext(ApplicationContext);

  const handleDeleteProduct = (id) => {
    deleteProduct(id).then((resp) => {
      setAppState({
        ...appState,
        products: appState.products.filter((product) => product.id !== id),
      });
    });
  };

  useEffect(() => {
    handleGetProductsPaginated(
      appState.keyword,
      appState.currentPage,
      appState.pageSize
    );
  }, []);

  const handleGetProductsPaginated = (keyword, page, size) => {
    getProductsPaginated(keyword, page, size)
      .then((resp) => {
        //console.log(resp.headers.get('X-total-count'));
        console.log(resp.data)
        const totalElements = resp.headers.get("X-total-count");
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size !== 0) {
          totalPages++;
        }

        setAppState({
          ...appState,
          products: resp.data,
          keyword: keyword,
          currentPage: page,
          pageSize: size,
          totalPages: totalPages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckProduct = (id, product) => {
    updateCheckProduct(product).then((resp) => {
      setAppState({
        ...appState,
        products: appState.products.map((product) => {
          if (product.id === id) {
            product.checked = !product.checked;
          }
          return product;
        }),
      });
    });
  };

  const handleGoToPage = (page) => {
    console.log(page)
    handleGetProductsPaginated(appState.keyword, page, setAppState.pageSize);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleGetProductsPaginated(appState.keyword, 1, appState.pageSize);
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
                      value={appState.keyword}
                      onChange={(e) =>
                        setAppState({
                          ...appState,
                          keyword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        handleGetProductsPaginated(
                          appState.keyword,
                          appState.currentPage,
                          appState.pageSize
                        )
                      }
                    >
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
                          onClick={() =>
                            handleCheckProduct(product.id, product)
                          }
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
                        appState.currentPage == index + 1
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
