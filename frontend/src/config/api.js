import axios from "axios";
import Cookies from "js-cookie";
import { url } from "./settings.js";

const token = Cookies.get("token");

const api = axios.create({
  baseURL: url,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
