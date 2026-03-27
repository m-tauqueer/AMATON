import { useCallback, useEffect, useState } from "react";
import { getCategories, getProducts } from "../services/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [productResponse, categoryResponse] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(productResponse);
      setCategories(categoryResponse);
    } catch (err) {
      setError(err.message || "Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    categories,
    loading,
    error,
    refetchProducts: fetchProducts,
  };
};

export default useProducts;
