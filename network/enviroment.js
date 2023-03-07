import axios from "axios";
export const BaseURL = axios.create({
  baseURL: "https://api.dev.nuodata.io/",
  timeout: 60*60*1000,
});
