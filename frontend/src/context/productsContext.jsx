/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";

const ProductsContext = createContext(null);

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }
  return ctx;
};

export const ProductsProvider = ({ children }) => {
  // Filters that affect the API request
  const [filters, setFilters] = useState({
    category: "all",
    sort: "price_asc", // price_asc | price_desc
  });

  /**
   * Build query string from filters
   * This is the MOST IMPORTANT pattern here
   */
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (filters.category !== "all") {
      params.append("category", filters.category);
    }

    if (filters.sort) {
      params.append("sort", filters.sort);
    }

    // 🚧 You will add later:
    // params.append("rating", ...)
    // params.append("brand", ...)
    // params.append("price", ...)
    // params.append("discount", ...)
    // params.append("limit", ...)
    // params.append("page", ...)

    return params.toString();
  }, [filters]);

  const url =
    `http://localhost:8080/api/v1/products${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading } = useFetch(url);

  const value = {
    products: data ?? [],
    loading: isLoading,
    error,
    filters,
    setFilters,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
