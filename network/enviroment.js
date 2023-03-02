import axios from "axios";
export const BaseURL = axios.create({
  baseURL: "https://api.nuodata.io/",
  timeout: 10000,
});
