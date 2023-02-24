import axios from "axios";
export const BaseURL = axios.create({
  baseURL: "https://api.dev.nuodata.io/",
  timeout: 10000,
});
