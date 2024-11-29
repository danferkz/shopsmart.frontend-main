import React, { useState } from 'react';

const AdminProducts = () => {
    // Datos de ejemplo
    const initialProducts = [
        { id: '1', name: 'Laptop', description: 'Potente laptop para trabajo', price: 999.99, stock: 50 },
        { id: '2', name: 'Smartphone', description: 'Último modelo con cámara avanzada', price: 699.99, stock: 100 },
        { id: '3', name: 'Auriculares', description: 'Auriculares inalámbricos con cancelación de ruido', price: 199.99, stock: 200 },
        { id: '4', name: 'Monitor', description: 'Monitor 4K de 27 pulgadas', price: 349.99, stock: 30 },
        { id: '5', name: 'Teclado', description: 'Teclado mecánico para gaming', price: 129.99, stock: 75 },
    ];

    const [products, setProducts] = useState(initialProducts);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleAddProduct = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newProduct = {
            id: Date.now().toString(),
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock'), 10),
        };
        setProducts([...products, newProduct]);
        setIsAddDialogOpen(false);
    };

    const handleEditProduct = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedProduct = {
            id: currentProduct.id,
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock'), 10),
        };
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setIsEditDialogOpen(false);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                    <p className="text-gray-600">Administra tus productos fácilmente</p>
                </div>

                {/* Botón para abrir el modal de añadir producto */}
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Añadir Producto
                    </button>
                </div>

                {/* Tabla de productos */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2 text-left">Nombre</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Descripción</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Precio</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Stock</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-200 px-4 py-2">{product.description}</td>
                                    <td className="border border-gray-200 px-4 py-2">${product.price.toFixed(2)}</td>
                                    <td className="border border-gray-200 px-4 py-2">{product.stock}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        <div className="flex space-x-2">
                                            {/* Editar Producto */}
                                            <button
                                                onClick={() => {
                                                    setCurrentProduct(product);
                                                    setIsEditDialogOpen(true);
                                                }}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Editar
                                            </button>

                                            {/* Eliminar Producto */}
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal de añadir producto */}
                {isAddDialogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg w-96 p-6">
                            <h3 className="text-xl font-bold mb-4">Añadir Nuevo Producto</h3>
                            <form onSubmit={handleAddProduct}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700">Nombre</label>
                                    <input type="text" id="name" name="name" required className="w-full p-2 border rounded" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700">Descripción</label>
                                    <input type="text" id="description" name="description" required className="w-full p-2 border rounded" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="block text-gray-700">Precio</label>
                                    <input type="number" id="price" name="price" step="0.01" required className="w-full p-2 border rounded" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="stock" className="block text-gray-700">Stock</label>
                                    <input type="number" id="stock" name="stock" required className="w-full p-2 border rounded" />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddDialogOpen(false)}
                                        className="bg-gray-300 px-4 py-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Añadir Producto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal de editar producto */}
                {isEditDialogOpen && currentProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg w-96 p-6">
                            <h3 className="text-xl font-bold mb-4">Editar Producto</h3>
                            <form onSubmit={handleEditProduct}>
                                <div className="mb-4">
                                    <label htmlFor="edit-name" className="block text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        id="edit-name"
                                        name="name"
                                        defaultValue={currentProduct.name}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="edit-description" className="block text-gray-700">Descripción</label>
                                    <input
                                        type="text"
                                        id="edit-description"
                                        name="description"
                                        defaultValue={currentProduct.description}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="edit-price" className="block text-gray-700">Precio</label>
                                    <input
                                        type="number"
                                        id="edit-price"
                                        name="price"
                                        step="0.01"
                                        defaultValue={currentProduct.price}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="edit-stock" className="block text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        id="edit-stock"
                                        name="stock"
                                        defaultValue={currentProduct.stock}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditDialogOpen(false)}
                                        className="bg-gray-300 px-4 py-2 rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                    >
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
