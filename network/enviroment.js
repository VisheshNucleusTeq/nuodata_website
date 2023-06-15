import axios from "axios";
import { message } from "antd";
import { GETACCESSTOKEN } from "./apiConstants";
let isRefreshing = true;

export const BaseURL = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 60 * 60 * 1000,
});

BaseURL.interceptors.request.use(
  async (config) => {
    const expiryTime = localStorage.getItem("expiryTime");
    if (expiryTime && expiryTime <= Date.now() && isRefreshing) {
      isRefreshing = false;
      await refreshToken();
    }
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseURL.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      const token = localStorage.getItem("authToken");
      BaseURL.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return BaseURL(originalRequest);
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const resp = await axios.post(`${process.env.BASE_URL}${GETACCESSTOKEN}`, {
      refreshToken: refreshToken,
    });
    if (resp?.data?.accessCode) {
      const expiryTime = Date.now() + resp?.data?.accessCodeExpiry * 1000;
      localStorage.setItem("authToken", resp?.data?.accessCode);
      localStorage.setItem("refreshToken", resp?.data?.refreshToken);
      localStorage.setItem("expiryTime", expiryTime);
      isRefreshing = true;
      return resp;
    } else {
      localStorage.clear();
      message.error({
        key: (Math.random() + 1).toString(36).substring(7),
        content:
          "Your session has expired. Please login to pick up where you left off.",
        duration: 2,
        onClose: () => {
          window.location.assign("/");
        },
      });
    }
  } catch (e) {
    localStorage.clear();
    message.error({
      key: (Math.random() + 1).toString(36).substring(7),
      content:
        "Your session has expired. Please login to pick up where you left off.",
      duration: 5,
      onClose: () => {
        window.location.assign("/");
      },
    });
  }
};
