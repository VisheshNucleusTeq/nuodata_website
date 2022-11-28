import retry from "async-retry";
import Axios from "axios";
import { BaseURL as ApiInstance } from "./enviroment";

const create_header = (endpoint) => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const fetch_retry_post = async (endpoint, payload = {}) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.post(endpoint, payload);
        if (response.status === 200) {
          return { success: true, data: response.data };
        }
      },
      {
        retries: 0,
      }
    );
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
