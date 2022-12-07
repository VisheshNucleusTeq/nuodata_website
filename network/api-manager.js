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
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};

export const fetch_retry_post_with_file = async (endpoint, payload = {}) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.post(endpoint, payload, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          return { success: true, data: response.data };
        }
      },
      {
        retries: 0,
      }
    );
  } catch (error) {
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};
