import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

// IMPORTACIÓN DE SERVICIOS
import { createUser } from "../services/userService";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Por favor, completa todos los campos.");
      setSuccess("");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const { firstName, lastName, email, password } = formData;
      const response = await createUser({
        firstName,
        lastName,
        email,
        password,
      });
      console.log("Usuario registrado:", response.data);
      setSuccess("Usuario registrado exitosamente.");
      setError("");
      // Limpia el formulario
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error al registrar el usuario:", err);
      setError("Ocurrió un error al registrar el usuario. Inténtalo de nuevo.");
      setSuccess("");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-md"
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          className="text-center text-blue-500 font-bold mb-6"
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#2563EB",
          }}
        >
          Registrar Usuario
        </Typography>

        {/* Campo de Nombre de Usuario */}
        <TextField
          fullWidth
          label="Nombres"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
          className="mb-4"
          style={{
            marginBottom: "1.5rem",
          }}
        />

        {/* Campo de Correo Electrónico */}
        <TextField
          fullWidth
          label="Apellidos"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          className="mb-4"
          style={{
            marginBottom: "1.5rem",
          }}
        />

        {/* Campo de Correo Electrónico */}
        <TextField
          fullWidth
          label="Correo Electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          className="mb-4"
          style={{
            marginBottom: "1.5rem",
          }}
        />

        {/* Campo de Contraseña */}
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          className="mb-4"
          style={{
            marginBottom: "1.5rem",
          }}
        />

        {/* Campo de Confirmar Contraseña */}
        <TextField
          fullWidth
          label="Confirmar Contraseña"
          type="password"
          name="confirmPassword" // Agrega este atributo
          value={formData.confirmPassword} // Maneja el estado
          onChange={handleChange} // Llama al manejador
          variant="outlined"
          className="mb-4"
          style={{
            marginBottom: "1.5rem",
          }}
        />

        {/* Mensaje de error */}
        {error && (
          <Typography
            variant="body2"
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {error}
          </Typography>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <Typography
            variant="body2"
            style={{
              color: "green",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {success}
          </Typography>
        )}

        {/* Botón de Registrar */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#2563EB",
            color: "white",
            fontWeight: "bold",
            padding: "0.65rem",
          }}
        >
          Registrar
        </Button>
      </Box>
    </div>
  );
};

export default RegisterUser;
