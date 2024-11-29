import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// IMPORTAR EL MODAL
import ProductDetailModal from "../components/ProductDetailModal";
import UploadImageModal from "../components/UploadImageModal";

// IMPORTACIÓN DE SERVICIOS
import {
  getAllProducts,
  getProductByName,
  getProductByPriceRange,
  getProductsByCategory,
} from "../services/productService";

import { getAllCategory } from "../services/categoryService";

import { uploadImage } from "../services/imageService";

const Products = () => {
  const [products, setProducts] = useState([]); // Estado para los productos
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
  const [open, setOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [productToUpload, setProductToUpload] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.data); // Asignamos los datos al estado
    } catch (err) {
      setError("Error al cargar los productos."); // Manejo de errores
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      setCategories(response.data.data); // Asignamos las categorías al estado
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Manejo de cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Aplicar filtros
  const applyFilters = async () => {
    setLoading(true);
    setError(null);

    try {
      if (filters.name) {
        const response = await getProductByName(filters.name);
        setProducts(response.data.data);
      } else if (filters.minPrice && filters.maxPrice) {
        const response = await getProductByPriceRange(
          filters.minPrice,
          filters.maxPrice
        );
        setProducts(response.data.data);
      } else if (filters.category) {
        const response = await getProductsByCategory(filters.category);
        setProducts(response.data.data);
      } else {
        fetchProducts(); // Si no hay filtros, recarga los productos
      }
    } catch (err) {
      setError("Error al aplicar los filtros.");
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal con el producto seleccionado
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleUploadImage = (productId) => {
    alert(`Subir imagen para el producto con ID: ${productId}`);
  };

  // Función para abrir el modal de subir imágenes
  const handleOpenUploadModal = (product) => {
    setProductToUpload(product);
    setUploadModalOpen(true);
  };

  // Función para cerrar el modal de subir imágenes
  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
    setProductToUpload(null);
  };

  // Lógica para manejar la subida de imágenes
  const handleUploadComplete = async (productId, files) => {
    await uploadImage(productId, files);
    await fetchProducts(); // Actualizar los productos después de subir
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
      }}
    >
      <Paper
        elevation={3}
        className="p-6 rounded-lg shadow-lg"
        style={{
          backgroundColor: "white",
          padding: "2rem",
          width: "100%", // Ocupa todo el ancho
          height: "100vh", // Ocupa toda la altura de la ventana
          boxSizing: "border-box", // Incluye el padding en el tamaño total
        }}
      >
        {/* Título */}
        <Typography
          variant="h4"
          component="h1"
          className="text-center text-blue-500 font-bold mb-6"
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Lista de Productos
        </Typography>

        {/* Filtros */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            gap: "1rem",
          }}
        >
          {/* Filtro por nombre */}
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            style={{
              flex: 1,
              height: "56px", // Altura estándar de un campo de texto Material-UI
            }}
            InputProps={{
              style: {
                height: "56px", // Consistencia en altura
              },
            }}
          />

          {/* Filtro por rango de precios */}
          <TextField
            label="Precio (mín - máx)"
            variant="outlined"
            placeholder="Ej: 10-50"
            name="priceRange"
            onChange={(e) => {
              const [min, max] = e.target.value.split("-");
              setFilters({ ...filters, minPrice: min, maxPrice: max });
            }}
            style={{
              flex: 1,
              height: "56px", // Altura estándar de un campo de texto
            }}
            InputProps={{
              style: {
                height: "56px", // Consistencia en altura
              },
            }}
          />

          {/* Filtro por categoría */}
          <FormControl
            variant="outlined"
            style={{
              flex: 1,
              height: "56px", // Altura estándar de un campo de texto
            }}
            InputProps={{
              style: {
                height: "56px", // Consistencia en altura
              },
            }}
          >
            <InputLabel>Categoría</InputLabel>
            <Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              label="Categoría"
              style={{
                height: "56px", // Altura estándar
              }}
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Botón de aplicar filtros */}
          <Button
            variant="contained"
            color="primary"
            onClick={applyFilters}
            style={{
              flex: 0.5,
              height: "56px", // Igual altura al resto de los filtros
              display: "flex",
              alignItems: "center", // Centrado vertical del texto
              justifyContent: "center", // Centrado horizontal del texto
            }}
          >
            Filtrar
          </Button>
        </div>

        {/* Estado de carga */}
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography
            variant="body1"
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {error}
          </Typography>
        ) : (
          <TableContainer
            sx={{
              border: "1.5px solid #000", // Borde exterior visible
              borderRadius: "8px", // Bordes curveados
              overflow: "hidden", // Para respetar los bordes curveados
              marginTop: "1rem", // Espaciado superior para que no esté pegada a los filtros
            }}
          >
            <Table
              sx={{
                "& th": {
                  backgroundColor: "#87de27", // Color azul para el encabezado
                  color: "black", // Texto blanco
                  fontWeight: "bold", // Negrita en encabezados
                },
                "& td, & th": {
                  border: "1.5px solid #000", // Borde interno de las celdas
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="font-bold text-blue-600">
                    Nombre
                  </TableCell>
                  <TableCell align="center" className="font-bold text-blue-600">
                    Marca
                  </TableCell>
                  <TableCell align="center" className="font-bold text-blue-600">
                    Categoría
                  </TableCell>
                  <TableCell align="center" className="font-bold text-blue-600">
                    Precio
                  </TableCell>
                  <TableCell align="center" className="font-bold text-blue-600">
                    Descripción
                  </TableCell>
                  <TableCell align="center" className="font-bold text-blue-600">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-100">
                    <TableCell align="center">
                      {product.name || "No disponible"}
                    </TableCell>
                    <TableCell align="center">
                      {product.brand || "No disponible"}
                    </TableCell>
                    <TableCell align="center">
                      {product.category.name || "No disponible"}
                    </TableCell>
                    <TableCell align="center">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">{product.description}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(product)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenUploadModal(product)}
                      >
                        <FileUploadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Modal para mostrar detalles del producto */}
      <ProductDetailModal
        open={open}
        onClose={handleCloseModal}
        product={selectedProduct}
      />

      {/* Modal para subir imágenes */}
      <UploadImageModal
        open={uploadModalOpen}
        onClose={handleCloseUploadModal}
        productId={productToUpload?.id}
        onUploadSuccess={handleUploadComplete}
      />
    </div>
  );
};

export default Products;
