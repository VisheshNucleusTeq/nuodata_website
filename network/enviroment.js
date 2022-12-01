import axios from "axios";

export const BaseURL = axios.create({
  baseURL: "http://65.2.184.99:8081/",
  timeout: 5000,
});
