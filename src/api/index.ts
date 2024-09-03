import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = axios.create({
  baseURL: "https://trade.namtech.uz",
});
baseURL.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
      let token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.log(err);
    }
    return config;
  }
);
export default baseURL;
