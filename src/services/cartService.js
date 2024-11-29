import API from "./axios.config";

// SERVICIO GET
export const getCart = async (cartId = 1) => {
  try {
    const response = await API.get(`/api/v1/carts/${cartId}/my-cart`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del carrito:", error);
    throw error;
  }
};

// SERVICIO POST
export const addItemToCart = async (productId, quantity) => {
  try {
    const response = await API.post(
      `/api/v1/cartItems/item/add`,
      null, // No se envía body
      {
        params: {
          cartId: "", // CartId vacío según tu descripción
          productId,
          quantity,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al añadir producto al carrito:", error);
    throw error;
  }
};

// SERVICIO PUT
export const editQuantityItemCart = async (cartId, itemId, quantity) => {
  try {
    const response = await API.put(
      `/api/v1/cartItems/cart/${cartId}/item/${itemId}/update?quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito:",
      error
    );
    throw error;
  }
};
