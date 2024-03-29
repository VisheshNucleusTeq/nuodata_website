import retry from "async-retry";
import { showError } from "../components/helper/errorMsg";
import { BaseURL as ApiInstance } from "./enviroment";

export const fetch_retry_get = async (
  endpoint,
  payload = {},
  showErrorStatus = true
) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.get(endpoint, payload);
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
    error?.response?.status != 401 &&
      showErrorStatus &&
      showError(error?.response?.data?.errorMessages);
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};

export const fetch_retry_post = async (
  endpoint,
  payload = {},
  showErrorStatus = true
) => {
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
    error?.response?.status != 401 &&
      showErrorStatus &&
      showError(error?.response?.data?.errorMessages);
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};

export const fetch_retry_put = async (
  endpoint,
  payload = {},
  showErrorStatus = true
) => {
  try {
    return await retry(
      async () => {
        const response = await ApiInstance.put(endpoint, payload);
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
    error?.response?.status != 401 &&
      showErrorStatus &&
      showError(error?.response?.data?.errorMessages);
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};

export const fetch_retry_delete = async (
  endpoint,
  payload = {},
  showErrorStatus = true
) => {
  try {
    console.log("payload --- ", payload);
    return await retry(
      async () => {
        const response = await ApiInstance.delete(endpoint, payload);
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
    error?.response?.status != 401 &&
      showErrorStatus &&
      showError(error?.response?.data?.errorMessages);
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};

export const fetch_retry_post_with_file = async (
  endpoint,
  payload = {},
  showErrorStatus = true
) => {
  try {
    const token = localStorage.getItem("authToken");
    return await retry(
      async () => {
        const response = await ApiInstance.post(endpoint, payload, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
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
    error?.response?.status != 401 &&
      showErrorStatus &&
      showError(error?.response?.data?.errorMessages);
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};

export const fetch_retry_put_with_file = async (
  endpoint,
  payload = {},
  showErrorStatus = true
) => {
  try {
    const token = localStorage.getItem("authToken");
    return await retry(
      async () => {
        const response = await ApiInstance.put(endpoint, payload, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
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
    error?.response?.status != 401 &&
      showErrorStatus &&
      showError(error?.response?.data?.errorMessages);
    return { success: false, error: error?.response?.data?.errorMessages };
  }
};
