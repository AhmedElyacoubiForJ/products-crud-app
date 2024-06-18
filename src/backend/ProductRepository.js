import axios from "axios";

// baseUrl configuration
export const productsApi = axios.create({
  baseURL: "http://localhost:9000",
});

export const getProducts = () => {
  return productsApi.get("/products");
};

export const getProductsPaginated = (keyword="", page = 1, size = 4) => {
  return productsApi.get(`/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
};

export const getProduct = (id) => {
  return productsApi.get(`/products/${id}`);
};

export const addProduct = (product) => {
  return productsApi.post("/products", product);
};

export const deleteProduct = (id) => {
  return productsApi.delete(`/products/${id}`);
};

export const updateCheckProduct = (product) => {
  return productsApi.patch(`/products/${product.id}`, {
    ...product,
    checked: !product.checked,
  });
};

export const getProductById = (id) => {
  return productsApi.get(`/products/${id}`);
}

export const updateProduct = (id, product) => {
  return productsApi.patch(`/products/${id}`, product);
}
