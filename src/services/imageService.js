import API from "./axios.config";

// SERVICIOS POST
export const uploadImage = async (productId, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  return API.post(`/api/v1/images/upload?productId=${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
