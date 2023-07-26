import apiConfig from "./apiConfig";

const client = apiConfig.create({
  baseURL: apiConfig.defaults.baseURL + "/payments",
});

export default client;
