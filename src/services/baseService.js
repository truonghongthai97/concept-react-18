import axios from "axios";
import authService from "./authService";

const baseConfig = {
  baseURL: "http://localhost:8080/api",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
};

let refreshingToken = null;

axios.defaults.headers = baseConfig.headers;
export const createInstance = () => axios.create(baseConfig);
const axiosInstance = axios.create(baseConfig);

const handleRequest = (config) => {
  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] =
      localStorage.getItem("accessToken") || null;
  }

  return config;
};
const handleRequestError = (error) => {
  return Promise.reject(error);
};

const handleResponse = (response) => response.data;
const handleResponseError = async (error) => {
  const { status, data } = error?.response || {};
  let originalRequest = error?.config || {};

  if (
    status === 401 &&
    !originalRequest._retry &&
    data.errorCode !== "EXS-1003"
  ) {
    originalRequest._retry = true;

    try {
      refreshingToken = refreshingToken
        ? refreshingToken
        : authService.refreshToken();

      const { accessToken = "" } = await refreshingToken;
      refreshingToken = null;

      localStorage.setItem("accessToken", accessToken);
      originalRequest.headers = baseConfig.headers;

      return axiosInstance(originalRequest);
    } catch (err) {
      refreshingToken = null;
      return Promise.reject(err);
    }
  }

  return Promise.reject(data);
};

axiosInstance.interceptors.request.use(handleRequest, handleRequestError);
axiosInstance.interceptors.response.use(handleResponse, handleResponseError);

export default axiosInstance;
