import { createContext, useState } from "react";

export const ApplicationContext = createContext();

export const useAppState = () => {
  const initialState = {
    products: [],
    currentPage: 1,
    pageSize: 4,
    keyword: "",
    totalPages: 0,
  };
  const appState = useState(initialState);

  return appState;
};
