import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../backend/ProductRepository";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    checked: false,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const handleGetProductById = (id) => {
    getProductById(id)
      .then((resp) => {
        setProduct(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, product);
  };


  useEffect(() => {
    handleGetProductById(id);
  }, []);

  return (
    <div className="row p-1">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3>Edit Product</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  value={product.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price:
                </label>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="price"
                  className="form-control"
                  id="price"
                  value={product.price}
                />
              </div>

              <div className="form-check">
                <input
                  onChange={(e) => handleChange(e)}
                  className="form-check-input"
                  type="checkbox"
                  name="checked"
                  id="checked"
                  //checked={product.checked? true : false}
                  value={product.checked}
                />
                <label className="form-check-label" htmlFor="checked">
                  Checked
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
