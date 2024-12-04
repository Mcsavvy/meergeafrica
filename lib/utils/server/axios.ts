// server side axios configuration
import globalAxios from "axios";
import { getAccessToken } from "./auth";
import { BACKEND_URL } from "@/config";

const axios = globalAxios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((request) => {
  const token = getAccessToken();
  request.headers.Authorization = token ? `Bearer ${token}` : "";
  return request;
});

export default axios;
