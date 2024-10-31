import axios from "axios";
//import {store} from "../redux/store.js"

const axiosInstance = axios.create({
  baseURL: `https://localhost:7131/api/`,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  async (config) => {
    const tmp = JSON.parse(localStorage.getItem("authUser"));
    const token = tmp.token;
    const decoded = parseJwt(token);
    const expiration = decoded.exp;
    console.log(tmp);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        const tmp = JSON.parse(localStorage.getItem("authUser"));
        const token = tmp.token;
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/log-in";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
async function refreshToken() {
  const tmp = JSON.parse(localStorage.getItem("authUser"));
  const token = tmp.token;
  const refreshToken = tmp?.refreshToken;
  if (!refreshToken) throw new Error("No refresh token available");
  const response = await axios.post(
    `https://localhost:7131/api/Authentication/RefreshToken`,
    {
      expiredToken: token,
      refreshToken: refreshToken,
    }
  );
  if (response.status === 200) {
    console.log(response);
    localStorage.removeItem("authUser")
    localStorage.setItem("authUser", JSON.stringify(response.data));
  } else {
    throw new Error("Failed to refresh token");
  }
}
export default axiosInstance;
