import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Recuperar carrito de localStorage al inicializar
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar cambios del carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Función para agregar producto al carrito
  const addToCart = (product) => {
    setCartItems(currentItems => {
      // Buscar si el producto ya existe en el carrito
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Si existe, incrementar cantidad
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex], 
          quantity: newItems[existingItemIndex].quantity + 1
        };
        return newItems;
      } else {
        // Si no existe, agregar nuevo producto con cantidad 1
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para actualizar cantidad de un producto
  const updateQuantity = (id, change) => {
    setCartItems(currentItems => 
      currentItems
        .map(item => 
          item.id === id 
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Función para eliminar un producto del carrito
  const removeItem = (id) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.id !== id)
    );
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular total del carrito
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      removeItem, 
      clearCart,
      total 
    }}>
      {children}
    </CartContext.Provider>
  );
};