import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminClientes = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        // Hacer la solicitud para obtener los usuarios
        axios
            .get('http://localhost:8080/api/v1/users/get-all')
            .then((response) => {
                const users = response.data.data;
                // Filtrar solo los usuarios con rol 'USER'
                const filteredUsers = users.filter(user =>
                    user.role.some(role => role.name === 'USER')
                );
                setCustomers(filteredUsers);
            })
            .catch((error) => {
                console.error('Hubo un error al obtener los usuarios:', error);
            });
    }, []); // Este useEffect se ejecutará solo una vez, cuando se monte el componente

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
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="border px-4 py-2">{`${customer.firstName} ${customer.lastName}`}</td>
                                <td className="border px-4 py-2">{customer.email}</td>
                                <td className="border px-4 py-2">No disponible</td> {/* Asumiendo que no hay un campo teléfono */}
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
                            <p><strong>Nombre:</strong> {`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</p>
                            <p><strong>Email:</strong> {selectedCustomer.email}</p>
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
