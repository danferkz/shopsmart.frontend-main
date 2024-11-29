import React from 'react';
import { Button } from "@mui/material";
import { Minus, Plus, Trash2 } from 'lucide-react';

// Simulamos datos de productos en el carrito
const cartItems = [
  { id: 1, name: "Camiseta", price: 25.99, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "Pantalón", price: 49.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "Zapatos", price: 79.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
];

const CarritoCompras = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id, change) => {
    // Aquí iría la lógica para actualizar la cantidad
    console.log(`Cambiando cantidad del producto ${id} por ${change}`);
  };

  const handleRemoveItem = (id) => {
    // Aquí iría la lógica para eliminar un item del carrito
    console.log(`Eliminando producto ${id} del carrito`);
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="p-4 flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4"/>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Proceder al Pago
        </Button>
      </div>
    </div>
  );
};

export default CarritoCompras;

