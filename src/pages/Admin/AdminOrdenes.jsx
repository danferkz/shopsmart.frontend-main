// crea una vista simple
import React from 'react';

const AdminOrdenes = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
            <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Ordenes</h1>
            <p className="text-gray-600">Aquí se listan las ordenes</p>
            </div>
        </div>
        </div>
    );
    }

export default AdminOrdenes;