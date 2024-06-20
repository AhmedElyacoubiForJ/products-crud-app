import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteProduct,
  updateCheckProduct,
  getProductsPaginated,
} from "../backend/ProductRepository";

import { ProductsContext } from "../context/ProductsContext";

import { useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import ProductItem from "./ProductItem";
import PagginationNav from "./PagginationNav";

function Products() {
  const navigate = useNavigate();
  const [appState, setAppState] = useContext(ProductsContext);

  useEffect(() => {
    handleGetProductsPaginated(
      appState.keyword,
      appState.currentPage,
      appState.pageSize
    );
  }, []);

  const getTotalPages = (resp, size) => {
    const totalElements = resp.headers.get("X-Total-Count");
    let totalPages = Math.floor(totalElements / size);
    if (totalElements % size !== 0) {
      totalPages = totalPages + 1;
    }
    return totalPages;
  };

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
          pageSize: size,
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

  const handleDeleteProduct = (id) => {
    // update DB
    deleteProduct(id)
      .then((resp) => {
        // update UI
        const newProducts = appState.products.filter(
          (product) => product.id !== id
        );
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
              {/* search form */}
              <SearchForm
                handleGetProductsPaginated={handleGetProductsPaginated}
              />
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
                    <ProductItem
                      product={product}
                      handleCheckProduct={handleCheckProduct}
                      handleDeleteProduct={handleDeleteProduct}
                    />
                  ))}
                </tbody>
              </table>
              <PagginationNav
                totalPages={appState.totalPages}
                currentPage={appState.currentPage}
                handleGoToPage={handleGoToPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
