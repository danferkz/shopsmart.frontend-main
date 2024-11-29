import API from "./axios.config";

// SERVICIOS POST
export const createUser = async (data) => {
  return API.post(`/api/v1/users/add`, data);
};


// SERVICIOS PUT
export const editUserById = async (idUser, data) => {
  return API.put(`/api/v1/users/${idUser}/update`, data)
}