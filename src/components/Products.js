import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteProduct,
  getProducts,
  updateCheckProduct,
  getProductsPaginated,
} from "../backend/ProductRepository";

function Products() {
  const [products, setProducts] = useState([]);
  const [paggingState, setPaggingState] = useState({
    products: [],
    currentPage: 1,
    pageSize: 4,
    keyword: "",
  });

  useEffect(() => {
    //handleGetProducts();
    handleGetProductsPaginated(
      paggingState.keyword,
      paggingState.currentPage,
      paggingState.pageSize
    );
  }, []);


  const handleGetProductsPaginated = (keyword, page, size) => {
    getProductsPaginated(keyword, page, size)
     .then((resp) => {
       console.log(resp.data)
        setPaggingState({
         ...paggingState,
          products: resp.data,
          keyword: keyword,
          currentPage: page,
          pageSize: size,
        });
      })
     .catch((err) => {
        console.log(err);
      });
  }

  const handleGetProducts = () => {
    //getProducts()
    getProductsPaginated()
      .then((products) => {
        setProducts(products.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        //handleGetProducts();
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckProduct = (id, product) => {
    updateCheckProduct(product)
      .then((resp) => {
        //handleGetProducts();
        setProducts(
          products.map((product) =>
            product.id === id
              ? { ...product, checked: !product.checked }
              : product
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-1 m-1">
      <div className="row">
        <div className="col-md-6"></div>
      </div>
      <div className="card">
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
              {paggingState.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      onClick={() => handleCheckProduct(product.id, product)}
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
                    <button className="btn btn-outline-info m-2">
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
