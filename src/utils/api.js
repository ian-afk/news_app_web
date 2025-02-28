const BASE_API_URL = "http://localhost:8080";

export const getListNews = async () => {
  const res = await fetch(`${BASE_API_URL}/api/news/`);
  const data = await res.json();
  return data;
};
