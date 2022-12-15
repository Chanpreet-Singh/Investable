import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://vdw10x8lxi.execute-api.us-east-1.amazonaws.com/prod",
});

httpClient.interceptors.request.use(async function (config) {
  return config;
});

httpClient.interceptors.response.use(
  async function (config) {
    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default httpClient;
