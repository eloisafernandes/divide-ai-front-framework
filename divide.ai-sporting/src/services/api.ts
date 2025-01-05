import axios from "axios";
import { deleteUserLocalStorage } from "@/context/AuthProvider/util";
import { message } from 'antd';

const SESSION_EXPIRED_KEY = "session_expired";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

/**
 * Initializes the Axios instance with a custom response interceptor.
 * @param {Function} onUnauthorized - Callback function to be called when a 401 response is received.
 */
export const initializeAxios = (onUnauthorized: { (): void; (): void; }) => {
  const currentUrl = window.location.pathname;
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        if (currentUrl !== '/login') {
          onUnauthorized(); // Calls the callback function to redirect
          deleteUserLocalStorage();
          message.error({
            content: "Session expired! Login again.",
            key: SESSION_EXPIRED_KEY,
          });        }
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
};