import apiConfig from "./apiConfig";

const socPocRoc = apiConfig.create({
  baseURL: apiConfig.defaults.baseURL + "/getSocPocData",
});

export default socPocRoc;
