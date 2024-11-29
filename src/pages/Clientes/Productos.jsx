import { useState, useEffect } from 'react';

// Simulated product data
const products = [
    { id: '1', name: 'Smartphone X', brand: 'TechCo', category: 'Electronics', price: 699, image: '/placeholder.svg?height=200&width=200' },
    { id: '2', name: 'Laptop Pro', brand: 'CompuTech', category: 'Electronics', price: 1299, image: '/placeholder.svg?height=200&width=200' },
    { id: '3', name: 'Wireless Earbuds', brand: 'AudioPhile', category: 'Audio', price: 149, image: '/placeholder.svg?height=200&width=200' },
    { id: '4', name: 'Smart Watch', brand: 'TechCo', category: 'Wearables', price: 299, image: '/placeholder.svg?height=200&width=200' },
    { id: '5', name: 'Digital Camera', brand: 'PhotoPro', category: 'Photography', price: 799, image: '/placeholder.svg?height=200&width=200' },
];

const Productos = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({
        name: '',
        brand: '',
        category: '',
        minPrice: 0,
        maxPrice: 2000,
    });

    const brands = [...new Set(products.map(p => p.brand))];
    const categories = [...new Set(products.map(p => p.category))];

    useEffect(() => {
        const newFilteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            (filters.brand === '' || product.brand === filters.brand) &&
            (filters.category === '' || product.category === filters.category) &&
            product.price >= filters.minPrice &&
            product.price <= filters.maxPrice
        );
        setFilteredProducts(newFilteredProducts);
    }, [filters]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">Productos</h1>
                    <p className="text-gray-600">Aquí se listan los productos</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="md:col-span-1 space-y-4">
                        {/* Nombre del Producto */}
                        <div>
                            <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700">Buscar por nombre</label>
                            <input
                                id="name-filter"
                                type="text"
                                value={filters.name}
                                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                                placeholder="Buscar productos..."
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        {/* Filtro por Marca */}
                        <div>
                            <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700">Filtrar por marca</label>
                            <select
                                id="brand-filter"
                                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Todas las marcas</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro por Categoría */}
                        <div>
                            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">Filtrar por categoría</label>
                            <select
                                id="category-filter"
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Rango de Precio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rango de precio</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                                    className="w-20 border-gray-300 rounded-md shadow-sm"
                                />
                                <span>a</span>
                                <input
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                                    className="w-20 border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                                    <div className="text-center">
                                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                        <h2 className="font-semibold text-lg">{product.name}</h2>
                                        <p className="text-sm text-gray-600">{product.brand}</p>
                                        <p className="text-sm text-gray-600">{product.category}</p>
                                        <p className="text-lg font-bold mt-2">${product.price}</p>
                                        <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition-colors">
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productos;
