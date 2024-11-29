import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Input,
  CircularProgress,
} from "@mui/material";

const UploadImageModal = ({ open, onClose, productId, onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Por favor selecciona al menos un archivo.");
      return;
    }

    setLoading(true);

    try {
      // Llamar al servicio para subir imágenes
      await onUploadSuccess(productId, files);
      alert("Imágenes subidas correctamente.");
      onClose();
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      alert("Ocurrió un error al subir las imágenes.");
    } finally {
      setLoading(false);
    }
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
          minWidth: "300px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Subir Imágenes
        </Typography>
        <Input
          type="file"
          multiple
          onChange={handleFileChange}
          sx={{ display: "block", margin: "1rem 0" }}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            fullWidth
          >
            Subir
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default UploadImageModal;
