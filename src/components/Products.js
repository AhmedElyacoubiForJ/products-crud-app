import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Products() {
  /*  const [products, setProducts] = useState([
    {id: 1, name: "Computer", price: 4300, checked: true},
    {id: 2, name: "Phone", price: 3000, checked: false},
    {id: 3, name: "Laptop", price: 5000, checked: true},
    {id: 4, name: "Tablet", price: 2000, checked: false},
  ]); */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = () => {
    axios.get("http://localhost:9000/products").then((response) => {
      const products = response.data;
      setProducts(products)
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  const handleCheckProduct = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, checked: !product.checked } : product
      )
    );
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
                <th scope="col" colspan="2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      onClick={() => handleCheckProduct(product.id)}
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
