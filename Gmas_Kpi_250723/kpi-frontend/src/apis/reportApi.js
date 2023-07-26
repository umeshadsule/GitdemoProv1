import apiConfig from "./apiConfig";

const getReports = apiConfig.create({
  baseURL: apiConfig.defaults.baseURL + "/reports",
});

export default getReports;
