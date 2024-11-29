import API from "./axios.config";

// SERVICIOS GET
export const getAllCategory = async () => {
  return API.get(`/api/v1/categories/all`);
};

// SERVICIOS POST
export const createCategory = async (data) => {
  return API.post(`/api/v1/categories/add`, data);
};
