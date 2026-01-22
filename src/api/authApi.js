import axios from "axios";

// 🔥 USE ENV VARIABLE
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// LOGIN
export const login = (data) =>
  API.post("/auth/login", data);

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);

export const setNewPassword = (data) =>
  API.post("/auth/set-new-password", data);

export default API;
