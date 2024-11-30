import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const API_BASE_URL = "http://localhost:8080/api/v1/products"; // Backend URL

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            setProducts(response.data.data); // Asume que `data` contiene los productos
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newProduct = {
            name: formData.get('name'),
            brand: formData.get('brand'),
            price: parseFloat(formData.get('price')),
            inventory: parseInt(formData.get('inventory'), 10),
            description: formData.get('description'),
            category: {
                name: formData.get('categoryName')
            },
            images: [] // Inicialmente vacío
        };

        try {
            await axios.post(`${API_BASE_URL}/add`, newProduct, {
                headers: { 'Content-Type': 'application/json' },
            });
            fetchProducts();
            setIsAddDialogOpen(false);
        } catch (error) {
            console.error("Error al añadir producto:", error.response?.data || error.message);
        }
    };

    const handleEditProduct = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedProduct = {
            name: formData.get('name'),
            brand: formData.get('brand'),
            price: parseFloat(formData.get('price')),
            inventory: parseInt(formData.get('inventory'), 10),
            description: formData.get('description'),
            category: {
                name: formData.get('categoryName')
            },
            images: []
        };

        try {
            await axios.put(`${API_BASE_URL}/product/${currentProduct.id}/update`, updatedProduct, {
                headers: { 'Content-Type': 'application/json' },
            });
            fetchProducts();
            setIsEditDialogOpen(false);
        } catch (error) {
            console.error("Error al editar producto:", error.response?.data || error.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/product/${id}/delete`);
            fetchProducts();
        } catch (error) {
            console.error("Error al eliminar producto:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                    <p className="text-gray-600">Administra tus productos fácilmente</p>
                </div>

                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Añadir Producto
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2 text-left">Nombre</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Descripción</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Marca</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Precio</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Inventario</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-200 px-4 py-2">{product.description}</td>
                                    <td className="border border-gray-200 px-4 py-2">{product.brand}</td>
                                    <td className="border border-gray-200 px-4 py-2">${product.price.toFixed(2)}</td>
                                    <td className="border border-gray-200 px-4 py-2">{product.inventory}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentProduct(product);
                                                    setIsEditDialogOpen(true);
                                                }}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Editar
                                            </button>
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

                {isAddDialogOpen && (
                    <ProductModal
                        title="Añadir Nuevo Producto"
                        onClose={() => setIsAddDialogOpen(false)}
                        onSubmit={handleAddProduct}
                    />
                )}

                {isEditDialogOpen && currentProduct && (
                    <ProductModal
                        title="Editar Producto"
                        onClose={() => setIsEditDialogOpen(false)}
                        onSubmit={handleEditProduct}
                        product={currentProduct}
                    />
                )}
            </div>
        </div>
    );
};

const ProductModal = ({ title, onClose, onSubmit, product }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-96 p-6">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={product?.name || ''}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Descripción</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={product?.description || ''}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="brand" className="block text-gray-700">Marca</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        defaultValue={product?.brand || ''}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-gray-700">Categoría</label>
                    <input
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        defaultValue={product?.category?.name || ''}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700">Precio</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        defaultValue={product?.price || ''}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="inventory" className="block text-gray-700">Inventario</label>
                    <input
                        type="number"
                        id="inventory"
                        name="inventory"
                        defaultValue={product?.inventory || ''}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default AdminProducts;
