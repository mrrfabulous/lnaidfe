import axios from "axios";

const baseURL =
  // (import.meta as any).env.VITE_API_BASE_URL || "https://lnaidbe.mistech.io";
  (import.meta as any).env.VITE_API_BASE_URL || "http://localhost:5001";

const client = axios.create({
  // baseURL: `${baseURL}/api`,
  baseURL: `${baseURL}/api`,
  timeout: 25000,
  headers: {
    Accept: "application/json",
  },
});

export default client;
