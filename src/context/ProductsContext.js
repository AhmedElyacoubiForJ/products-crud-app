import { createContext, useState } from "react";

export const ProductsContext = createContext();

export const useAppState = () => {
  const initialState = {
    keyword: "",
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
    products: [],
  };
  
  const appState = useState(initialState);

  return appState;
};
