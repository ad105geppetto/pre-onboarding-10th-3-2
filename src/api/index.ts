import axios from "axios";
import { Config, Data } from "./index.types";

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
  get: (url: string, config?: Config) => baseInstance.get(url, config),
  delete: (url: string, config?: Config) => baseInstance.delete(url, config),
  post: (url: string, data: Data, config?: Config) => baseInstance.post(url, data, config)
};

export default apiRequest;
