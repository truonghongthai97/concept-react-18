import axiosInstance, { createInstance } from "./baseService";
import useStore from "../store/useStore";

const login = (params) => {
  return createInstance().post("/auth/login", params);
};

const refreshToken = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh_token", {
      refreshToken: localStorage.getItem("refreshToken"),
    });

    return Promise.resolve(response);
  } catch (error) {
    useStore.getState().authSlide.logout();
    return Promise.reject(error);
  }
};

const getMe = () => {
  return axiosInstance.get("/auth/me");
};

const getPosts = () => {
  return axiosInstance.get("/posts");
};

const authService = {
  login,
  refreshToken,
  getMe,
  getPosts,
};

export default authService;
