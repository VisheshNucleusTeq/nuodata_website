import retry from "async-retry";
import Axios from "axios";

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
        const response = await Axios({
          url: endpoint,
          method: "post",
          data: payload ? JSON.stringify(payload) : {},
          headers: create_header(endpoint),
        });
        return response;
      },
      {
        retries: 0,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
