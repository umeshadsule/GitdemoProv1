import apiConfig from './apiConfig';

export const paymentTrendDataApi = (data) => {
  return apiConfig.post("/paymentTrendData", data);
};

export default paymentTrendDataApi