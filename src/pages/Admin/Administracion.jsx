import React from 'react';
import { Package, Users, ShoppingCart, Truck, BarChart } from 'lucide-react';

const Administracion = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Administración</h1>
            <p className="text-gray-600 mb-6">Aquí se listan los datos de administración</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Card 1: Gestión de Productos */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <Package className="h-8 w-8 text-blue-500" />
                        <h2 className="text-xl font-semibold">Gestión de Productos</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Administra tu catálogo de productos</p>
                    <p className="text-sm text-gray-500">Haz clic para más detalles</p>
                </div>

                {/* Card 2: Gestión de Clientes */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="h-8 w-8 text-green-500" />
                        <h2 className="text-xl font-semibold">Gestión de Clientes</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Administra la información de tus clientes</p>
                    <p className="text-sm text-gray-500">Haz clic para más detalles</p>
                </div>

                {/* Card 3: Gestión de Órdenes */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <ShoppingCart className="h-8 w-8 text-purple-500" />
                        <h2 className="text-xl font-semibold">Gestión de Órdenes</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Supervisa y gestiona los pedidos</p>
                    <p className="text-sm text-gray-500">Haz clic para más detalles</p>
                </div>

                {/* Card 4: Gestión de Proveedores */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <Truck className="h-8 w-8 text-orange-500" />
                        <h2 className="text-xl font-semibold">Gestión de Proveedores</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Administra tus relaciones con proveedores</p>
                    <p className="text-sm text-gray-500">Haz clic para más detalles</p>
                </div>

                {/* Card 5: Estadísticas */}
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart className="h-8 w-8 text-red-500" />
                        <h2 className="text-xl font-semibold">Estadísticas</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Visualiza el rendimiento de tu negocio</p>
                    <p className="text-sm text-gray-500">Haz clic para más detalles</p>
                </div>

            </div>
        </div>
    );
};

export default Administracion;
