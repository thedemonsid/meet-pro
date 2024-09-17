import axios from "axios";
const backend_url = `${process.env.BACKEND_URL}` || "http://localhost:5000";
const api = axios.create({
  baseURL: backend_url,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
