import axios from "axios";
const BASE_API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getListNews = async ({ pageParam = 1 }) => {
  const res = await api.get("/api/news", {
    params: { page: pageParam, limit: 3 },
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return res.data;
};

export const getNews = async (id) => {
  console.log(id);
  const res = await api.get(`/api/news/${id}`, {
    params: { id: id },
  });
  console.log(res.data);
  return res.data;
};
