import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, CircularProgress } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName || formData.firstName.length < 2) {
            newErrors.firstName = 'El nombre debe tener al menos 2 letras.';
        }
        if (!formData.lastName || formData.lastName.length < 2) {
            newErrors.lastName = 'El apellido debe tener al menos 2 letras.';
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Por favor, introduce un email válido.';
        }
        if (!formData.password || formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        try {
            const requestData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            };

            let endpoint = 'http://localhost:8080/api/v1/users/add';
            if (formData.role === 'admin') {
                endpoint = 'http://localhost:8080/api/v1/users/add/admin';
            } else if (formData.role === 'provider') {
                endpoint = 'http://localhost:8080/api/v1/users/add/provider';
            }

            const response = await axios.post(endpoint, requestData);
            console.log('Respuesta del servidor:', response.data);
            setSnackbar({ open: true, message: 'Registro exitoso', type: 'success' });
        } catch (error) {
            console.error('Error al registrar usuario:', error.response?.data || error.message);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Error desconocido',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const closeSnackbar = () => setSnackbar({ open: false, message: '', type: '' });

    return (
        <div className="container mx-auto p-4 flex items-center justify-center h-full bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg px-6 py-4 w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4 text-center">Registrar Usuario</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="block text-sm font-medium">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border p-2 w-full text-sm"
                            placeholder="Ingrese nombre"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="lastName" className="block text-sm font-medium">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border p-2 w-full text-sm"
                            placeholder="Ingrese apellido"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full text-sm"
                            placeholder="Ingresa tu correo"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full text-sm"
                            placeholder="********"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="role" className="block text-sm font-medium">
                            Rol
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="border p-2 w-full text-sm"
                        >
                            <option value="user">Cliente</option>
                            <option value="admin">Administrador</option>
                            <option value="provider">Proveedor</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white py-2 px-4 rounded w-full flex items-center justify-center ${
                            isLoading ? 'opacity-50' : ''
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Registrarse'}
                    </button>
                </form>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                ContentProps={{
                    style: {
                        backgroundColor: snackbar.type === 'success' ? '#4caf50' : '#f44336',
                    },
                }}
            />
        </div>
    );
};

export default Register;
