import React from 'react';
import { Button } from "@mui/material";

// Asumimos que estos datos vendrían de un contexto o props en una aplicación real
const userData = {
  nombre: "Juan",
  apellido: "Pérez",
  correo: "juan.perez@ejemplo.com"
};

const Cuentausuario = () => {
  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    console.log("Cerrando sesión...");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Cuenta de usuario</h1>
          <p className="text-gray-600">Información del usuario</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nombre</p>
            <p className="mt-1 text-lg font-semibold">{userData.nombre}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Apellido</p>
            <p className="mt-1 text-lg font-semibold">{userData.apellido}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Correo electrónico</p>
            <p className="mt-1 text-lg font-semibold">{userData.correo}</p>
          </div>
        </div>
        <div className="mt-8">
          <Button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cuentausuario;

