import { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// IMPORTACIÓN DE CART CONTEXT
import { useCart } from "../context/CartContext";

const ProductDetailModal = ({ open, onClose, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  const images = product?.images || [];

  
  const currentImageUrl =
    images.length > 0 && images[currentImageIndex]?.downloadUrl
      ? `${import.meta.env.VITE_BACKEND_URL}${
          images[currentImageIndex].downloadUrl
        }`
      : null;

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  // Manejar cambio de imagen siguiente
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleAddToCart = () => {
    addItem(product.id, 1); // Añadir el producto con cantidad 1
    alert("Producto añadido al carrito");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          width: "90%",
          maxWidth: "80vh",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {product ? (
          <>
            {/* Imagen del producto con navegación */}
            {images.length > 0 ? (
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <IconButton
                  onClick={handlePreviousImage}
                  sx={{ position: "absolute", left: 0 }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <img
                  src={currentImageUrl}
                  alt={product.name || "Imagen del producto"}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <IconButton
                  onClick={handleNextImage}
                  sx={{ position: "absolute", right: 0 }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            ) : (
              // Texto de "Imagen no disponible" si no hay imágenes
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    fontStyle: "italic",
                    fontWeight: "bold",
                  }}
                >
                  Imagen no disponible
                </Typography>
              </Box>
            )}

            {/* Detalles del producto */}
            <Typography variant="h6" gutterBottom>
              {product.name || "Nombre no disponible"}
            </Typography>
            <Typography variant="body1">
              Marca: {product.brand || "No disponible"}
            </Typography>
            <Typography variant="body1">
              Categoría: {product.category.name || "No disponible"}
            </Typography>
            <Typography variant="body1">
              En stock: {product.inventory || "No disponible"}
            </Typography>
            <Typography variant="body1">
              Precio: ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {product.description || "Sin descripción"}
            </Typography>

            {/* Contenedor centrado para el botón */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3, // Espaciado superior
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              >
                Añadir al carrito
              </Button>
              <Button variant="contained" color="error" onClick={onClose}>
                Cerrar
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1">No hay detalles disponibles.</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ProductDetailModal;
