import axios from "axios";
import mockData from "./db.json";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  const { url } = config;
  console.log(`Intercepting request to: ${url}`);

  const endpoint = url.replace(/^\//, "");
  const data = mockData[endpoint];

  if (data) {
    console.log(`Mock data found for endpoint: ${endpoint}`);
    return Promise.resolve({
      data,
      status: 200,
      statusText: "OK",
      headers: {},
      request: {},
      ...config,
    });
  }

  return Promise.reject(new Error(`Endpoint ${url} not found in db.json`));
});

export default instance;
