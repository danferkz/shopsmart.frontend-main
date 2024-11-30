import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/users/login', {
                email,
                password,
            });

            const { data } = response.data;

            // Guardar ID del usuario en el localStorage
            localStorage.setItem('userId', data.id);

            // Redirigir según el rol
            if (data.roles.includes('USER')) {
                navigate('/clientes/cuenta');
            } else {
                setError('No tiene permisos para acceder.');
            }
        } catch (err) {
            // Manejo de errores de la API
            setError(
                err.response?.data?.message || 'Error al iniciar sesión. Inténtalo nuevamente.'
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
                    <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="tu@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-500 text-center">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="flex flex-col items-center mt-4 space-y-2">
                    <a
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            alert('Funcionalidad de recuperar contraseña aún no implementada.');
                        }}
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                    <a
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/register');
                        }}
                    >
                        Registrate aquí
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
