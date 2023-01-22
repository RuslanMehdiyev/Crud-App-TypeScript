import axios from "axios";

export const northWindInstance = axios.create({
  baseURL: "https://northwind.vercel.app/api",
  timeout: 8000,
});
