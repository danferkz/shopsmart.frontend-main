import { createContext, useState, useContext, useEffect } from "react";

// IMPORTACION DE SERVICIOS
import { getCart, addItemToCart } from "../services/cartService";

// Crear el contexto
const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null); // Estado del carrito
  const cartId = 1;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(cartId); // Llama al servicio con el cartId
        setCart(data.data); // Asegúrate de asignar `data.data`
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };
    fetchCart();
  }, []);

  // Función para añadir un producto al carrito
  const addItem = async (productId, quantity) => {
    try {
      await addItemToCart(cartId, productId, quantity);
      const updatedCart = await getCart(cartId);
      setCart(updatedCart.data); // Actualiza el estado del carrito
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
