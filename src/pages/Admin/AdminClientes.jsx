import React, { useState } from 'react';

const AdminClientes = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Datos de ejemplo
    const customers = [
        { id: '1', name: 'Juan Pérez', email: 'juan@example.com', phone: '123-456-7890', totalOrders: 5 },
        { id: '2', name: 'María García', email: 'maria@example.com', phone: '098-765-4321', totalOrders: 3 },
        { id: '3', name: 'Carlos Rodríguez', email: 'carlos@example.com', phone: '555-555-5555', totalOrders: 7 },
        { id: '4', name: 'Ana Martínez', email: 'ana@example.com', phone: '111-222-3333', totalOrders: 2 },
        { id: '5', name: 'Luis Sánchez', email: 'luis@example.com', phone: '444-444-4444', totalOrders: 4 },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Clientes</h1>
                    <p className="text-gray-600">Aquí se listan los clientes</p>
                </div>

                {/* Tabla de clientes */}
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Nombre</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Teléfono</th>
                            <th className="border px-4 py-2">Total Pedidos</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="border px-4 py-2">{customer.name}</td>
                                <td className="border px-4 py-2">{customer.email}</td>
                                <td className="border px-4 py-2">{customer.phone}</td>
                                <td className="border px-4 py-2">{customer.totalOrders}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-600"
                                        onClick={() => setSelectedCustomer(customer)}
                                    >
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Diálogo de detalles */}
                {selectedCustomer && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg w-96 p-6">
                            <h3 className="text-xl font-semibold mb-4">Detalles del Cliente</h3>
                            <p><strong>Nombre:</strong> {selectedCustomer.name}</p>
                            <p><strong>Email:</strong> {selectedCustomer.email}</p>
                            <p><strong>Teléfono:</strong> {selectedCustomer.phone}</p>
                            <p><strong>Total de Pedidos:</strong> {selectedCustomer.totalOrders}</p>
                            <div className="mt-4 text-right">
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                    onClick={() => setSelectedCustomer(null)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminClientes;
