import retry from "async-retry";
import { BaseURL as ApiInstance } from "./enviroment";

export const fetch_retry_get = async (endpoint, payload = {}) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.get(endpoint, payload);
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

export const fetch_retry_post = async (endpoint, payload = {}) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.post(endpoint, payload);
        if (response.status === 200) {
          return {
            success: true,
            data: response.data,
            headers: response?.headers,
          };
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

export const fetch_retry_put = async (endpoint, payload = {}) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.put(endpoint, payload);
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

export const fetch_retry_delete = async (endpoint, payload = {}) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.delete(endpoint, payload);
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
