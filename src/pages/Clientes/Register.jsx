// src/pages/Clientes/Register.jsx
import React from 'react';

const Register = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="username" className="block">Username</label>
                    <input type="text" id="username" className="border p-2 w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block">Email</label>
                    <input type="email" id="email" className="border p-2 w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block">Password</label>
                    <input type="password" id="password" className="border p-2 w-full" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
