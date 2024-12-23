import axios from "axios";
import { env } from "../env";
export const client = axios.create({
  baseURL: env.api,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//client.interceptors.response.use(
//  (response) => response,
//  async (error) => {
//    const originalRequest = error.config;
//    if (error.response.status === 401 && !originalRequest._retry) {
//      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
//      try {
//        const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh token.
//        // Make a request to your auth server to refresh the token.
//        const response = await axios.post("https://your.auth.server/refresh", {
//          refreshToken,
//        });
//        const { accessToken, refreshToken: newRefreshToken } = response.data;
//        // Store the new access and refresh tokens.
//        localStorage.setItem("accessToken", accessToken);
//        localStorage.setItem("refreshToken", newRefreshToken);
//        // Update the authorization header with the new access token.
//        client.defaults.headers.common["Authorization"] =
//          `Bearer ${accessToken}`;
//        return client(originalRequest); // Retry the original request with the new access token.
//      } catch (refreshError) {
//        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
//        console.error("Token refresh failed:", refreshError);
//        localStorage.removeItem("accessToken");
//        localStorage.removeItem("refreshToken");
//        window.location.href = "/login";
//        return Promise.reject(refreshError);
//      }
//    }
//    return Promise.reject(error); // For all other errors, return the error as is.
//  },
//);
