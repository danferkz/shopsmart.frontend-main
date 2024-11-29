import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { editUserById } from "../services/userService";

const EditUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = 1; // Reemplazar con el ID del usuario actual
      await editUserById(userId, formData);
      alert("Usuario actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Hubo un problema al actualizar el usuario.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "2rem auto",
        padding: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" textAlign="center" marginBottom="1rem">
        Editar Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombres"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Apellidos"
          name="lastName"
          type="name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {/* <TextField
          fullWidth
          margin="normal"
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
        >
          Guardar Cambios
        </Button>
      </form>
    </Box>
  );
};

export default EditUser;
