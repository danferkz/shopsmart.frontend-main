import React from 'react';
import { useCart } from '../../context/CartContext'; // Ajusta la ruta
import { Button } from "@mui/material";
import { Minus, Plus, Trash2 } from 'lucide-react';
import PaymentButton from '../../components/PaymentButton'; // Ajusta la ruta

const Carrito = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeItem, 
    total, 
    clearCart 
  } = useCart();

  // Aquí puedes generar un número de compra de manera sencilla (por ejemplo, un timestamp)
  const purchaseNumber = Date.now();

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Tu carrito está vacío</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4"/>
              <div className="flex-grow">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="outlined" 
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button 
                  variant="outlined" 
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus />
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="mt-4">
            <h2 className="text-xl">Total: ${total.toFixed(2)}</h2>
            <Button 
              variant="contained" 
              color="primary"
              onClick={clearCart}
            >
              Vaciar Carrito
            </Button>
            {/* Aquí integramos PaymentButton */}
            <PaymentButton
              amount={parseFloat(total)}   // Usamos el total del carrito
              purchaseNumber={purchaseNumber} // Usamos un número único para la compra
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
