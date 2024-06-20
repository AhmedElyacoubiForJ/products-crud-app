import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const ProductsInfo = () => {
  const [appState, setAppState] = useContext(ProductsContext);

  return (
    <button type="button" className="btn btn-primary position-relative">
      Shopping card
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {appState.products.length}
      </span>
    </button>
  );
};

export default ProductsInfo;
