import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ProductItem = ({ product, handleCheckProduct, handleDeleteProduct }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default ProductItem;
