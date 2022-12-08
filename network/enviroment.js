import axios from "axios";

export const BaseURL = axios.create({
  baseURL: "http://3.109.185.25:8080/", //"http://13.52.240.48:8080/",
  timeout: 5000,
});
