'use client';

import React, { useState } from 'react';

const AdminAdmins = () => {
    const [admins, setAdmins] = useState([
        { id: '1', name: 'Juan Admin', email: 'juan@admin.com', role: 'Super Admin' },
        { id: '2', name: 'María Manager', email: 'maria@admin.com', role: 'Content Manager' },
        { id: '3', name: 'Carlos Coordinator', email: 'carlos@admin.com', role: 'Support Coordinator' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', role: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        const newAdmin = {
            id: Date.now().toString(),
            ...formState,
        };
        setAdmins((prev) => [...prev, newAdmin]);
        setFormState({ name: '', email: '', role: '' }); // Limpiar formulario
        setIsModalOpen(false); // Cerrar modal
    };

    const handleDeleteClick = (id) => {
        setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Gestión de Administradores</h1>

                {/* Botón para abrir el modal */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Agregar Administrador
                </button>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                            <h2 className="text-xl font-bold mb-4">Nuevo Administrador</h2>
                            <form onSubmit={handleAddAdmin}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                        Rol
                                    </label>
                                    <input
                                        id="role"
                                        name="role"
                                        type="text"
                                        value={formState.role}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Tabla */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Rol</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id} className="even:bg-gray-50">
                                <td className="border border-gray-300 p-2">{admin.name}</td>
                                <td className="border border-gray-300 p-2">{admin.email}</td>
                                <td className="border border-gray-300 p-2">{admin.role}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleDeleteClick(admin.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAdmins;
