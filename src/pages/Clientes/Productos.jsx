import { useState, useEffect } from 'react';
import axios from 'axios'; // Importar axios para hacer la solicitud HTTP
import { useCart } from '../../context/CartContext'; // Ajusta la ruta según la estructura de tu proyecto
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección

const Productos = () => {
    const { addToCart } = useCart(); // Usamos el hook para obtener la función addToCart
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        brand: '',
        category: '',
        minPrice: 0,
        maxPrice: 2000,
    });

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Hook para la navegación

    // Fetch the products from the API
    const fetchProducts = () => {
        axios.get('http://localhost:8080/api/v1/products/all')
            .then((response) => {
                const productData = response.data.data; // Accedemos a los productos de la respuesta
                setProducts(productData);
                setFilteredProducts(productData);

                // Extraemos marcas y categorías únicas
                const uniqueBrands = [...new Set(productData.map(p => p.brand))];
                const uniqueCategories = [...new Set(productData.map(p => p.category.name))];
                setBrands(uniqueBrands);
                setCategories(uniqueCategories);
            })
            .catch((error) => {
                console.error('Error al cargar los productos:', error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filtrar productos según los criterios seleccionados
    useEffect(() => {
        // Si el rango de precio ha cambiado, obtener productos filtrados por ese rango
        if (filters.minPrice && filters.maxPrice) {
            axios.get(`http://localhost:8080/api/v1/products/product/by-price-range?minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`)
                .then((response) => {
                    setProducts(response.data.data); // Actualizamos los productos con los que vienen de la API
                })
                .catch((error) => {
                    console.error('Error al obtener productos por rango de precio:', error);
                });
        } else {
            setProducts([]); // Si no hay rango de precio definido, limpiamos los productos
        }
    }, [filters.minPrice, filters.maxPrice]);

    // Filtrar productos por categoría seleccionada
    useEffect(() => {
        if (filters.category) {
            axios.get(`http://localhost:8080/api/v1/products/product/${filters.category}/all/products`)
                .then((response) => {
                    setProducts(response.data.data); // Actualizamos los productos según la categoría seleccionada
                })
                .catch((error) => {
                    console.error('Error al obtener productos por categoría:', error);
                });
        } else {
            setProducts([]); // Si no hay categoría seleccionada, limpiamos los productos
        }
    }, [filters.category]);

    useEffect(() => {
        const newFilteredProducts = products.filter(product =>
            (product.name || "").toLowerCase().includes((filters.name || "").toLowerCase()) &&
            (filters.brand === '' || product.brand === filters.brand) &&
            product.price >= filters.minPrice &&
            product.price <= filters.maxPrice
        );
        setFilteredProducts(newFilteredProducts);
    }, [filters, products]);

    const resetFilters = () => {
        setFilters({
            name: '',
            brand: '',
            category: '',
            minPrice: 0,
            maxPrice: 2000,
        });
        fetchProducts();
    };

    // Función para redirigir al carrito
    const redirectToCart = () => {
        navigate('/clientes/carrito'); // Redirige a la ruta /clientes/carrito
    };

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
                                    placeholder="Min"
                                />
                                <span>a</span>
                                <input
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                                    className="w-20 border-gray-300 rounded-md shadow-sm"
                                    placeholder="Max"
                                />
                            </div>
                        </div>

                        {/* Botón de Reset */}
                        <div>
                            <button
                                onClick={resetFilters}
                                className="w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600 transition-colors"
                            >
                                Resetear Filtros
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
                                    <div className="text-center">
                                        <img src={product.images.length > 0 ? product.images[0] : '/placeholder.svg?height=200&width=200'} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                        <h2 className="font-semibold text-lg">{product.name}</h2>
                                        <p className="text-sm text-gray-600">{product.brand}</p>
                                        <p className="text-sm text-gray-600">{product.category.name}</p>
                                        <p className="text-lg font-bold mt-2">S/.{product.price}</p>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition-colors"
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Botón para redirigir al carrito */}
                <div className="mt-6 text-center">
                    <button
                        onClick={redirectToCart}
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Ir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Productos;
