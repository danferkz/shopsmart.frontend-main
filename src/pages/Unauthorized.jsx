// src/pages/Unauthorized.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold text-cyan-600">Error 404</h1>
        </div>
    );
};

export default Unauthorized;
