import axios from "axios";
export const BaseURL = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 60*60*1000,
});
