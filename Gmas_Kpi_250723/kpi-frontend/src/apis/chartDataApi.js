import apiConfig from "./apiConfig";

const chartData = apiConfig.create({
  baseURL: apiConfig.defaults.baseURL + "/paymentTrendData",
});

export default chartData;
