import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export default api;
