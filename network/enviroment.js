import { message } from "antd";
import axios from "axios";
import { GETACCESSTOKEN, LOGIN } from "./apiConstants";
let isRefreshing = true;

export const BaseURL = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 60 * 60 * 1000,
});
//adding a comment
const updateBaseUrl = (config) => {
  if (process.env.IS_LOCAL && process.env.IS_LOCAL == "true") {
    if (config?.url.includes("core")) {
      config.baseURL = process.env.BASE_URL;
    } else if (config?.url.includes("gitupload")) {
      config.baseURL = process.env.BASE_URL;
    } else {
      config.baseURL = process.env.BASE_URL;
    }
  }
  return config;
};

BaseURL.interceptors.request.use(
  async (config) => {
    config = updateBaseUrl(config);

    if (LOGIN === config?.url) return config;

    const authPage = [
      "/",
      "/how-it-works/",
      "/sign-in/",
      "/sign-up/",
      "/contact-us/",
      "/data-management/",
      "/sso/",
      "/sso-login/",
      "/events/",
      "/test/",
      "/sso/sso-login/",
      "/sso/sso-logout/",
      "/sso/login/",
    ];

    const expiryTime = localStorage.getItem("expiryTime");
    if (
      expiryTime &&
      expiryTime <= Date.now() &&
      isRefreshing &&
      !authPage.includes(window?.location?.pathname)
    ) {
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
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      LOGIN != originalRequest?.url
    ) {
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
        key: "sessionExpired",
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
      key: "sessionExpired",
      content:
        "Your session has expired. Please login to pick up where you left off.",
      duration: 2,
      onClose: () => {
        window.location.assign("/");
      },
    });
  }
};
