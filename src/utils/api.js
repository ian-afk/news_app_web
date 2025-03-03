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

export const getListTags = async () => {
  const res = await api.get(`/api/tags/`);
  return res.data;
};

export const getNewsByTag = async (tagId) => {
  console.log(tagId);
  const res = await api.get(`/api/tags/news/${tagId}`, {
    params: { tagId: tagId },
  });
  return res.data;
};

export const addNews = async (body) => {
  console.log(body);
  const res = await api.post(`/api/news/`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res);
  return res.data;
};

// likes and dislikes api
export const likeDislike = async (id, body) => {
  console.log(id);
  const res = await api.patch(`/api/news/likedis/${id}`, body);
  return res.data;
};

export const deleteNews = async (id) => {
  const res = await api.delete(`/api/news/${id}`, {
    params: { id },
  });
  return res.data;
};

export const getStatistics = async () => {
  const res = await api.get(`/api/statistics`);
  return res.data;
};
