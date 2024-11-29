// src/pages/Clientes/Register.jsx
import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username || formData.username.length < 2) {
            newErrors.username = 'El nombre de usuario debe tener al menos 2 caracteres.';
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Por favor, introduce un email válido.';
        }
        if (!formData.password || formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        // Aquí iría la lógica para enviar los datos al servidor
        console.log(formData);

        setTimeout(() => {
            setIsLoading(false);
            alert('Registro exitoso');
            // Aquí se podría redirigir al usuario, por ejemplo:
            // router.push('/login');
        }, 2000); // Simula un delay de 2 segundos
    };

    return (
        <div className="container mx-auto p-4 flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg px-8 py-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Registrar Usuario</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="username" className="block">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            placeholder="Tu nombre"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            placeholder="tu@ejemplo.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            placeholder="********"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
