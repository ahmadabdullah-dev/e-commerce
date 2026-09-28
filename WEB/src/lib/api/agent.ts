import axios, { AxiosError } from "axios";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

agent.interceptors.response.use(
  (response) => response,
  (error: AxiosError<string>) => {
    if (error.response?.data) {
      return Promise.reject(new Error(error.response.data));
    }
    return Promise.reject(error);
  },
);
export default agent;
