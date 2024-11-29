import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// IMAGEN IMPORTADA
import BackgroundImage from "../assets/ShopSmart_Background.png";

import Header from "../components/Header";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (
      formData.email === "admin@erp.com" &&
      formData.password === "admin123"
    ) {
      login();
      navigate("/products");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  useEffect(() => {
    setFormData({ email: "", password: "" });
    setError("");
  }, []);

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${BackgroundImage})`, // Usa la imagen importada
        backgroundSize: "cover", // Hace que la imagen cubra toda la pantalla
        backgroundPosition: "center", // Centra la imagen
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
        flexDirection: "column", // Asegura que el contenido se apile verticalmente
      }}
        >
      

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-lg w-full max-w-sm"
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "400px",
          zIndex: 1, // Asegura que el formulario esté encima de la imagen
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
          Iniciar Sesión
        </Typography>

        <TextField
          fullWidth
          label="Correo Electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          className="mb-4"
          autoComplete="off"
          style={{
            marginBottom: "1rem",
          }}
        />

        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          className="mb-4"
          autoComplete="off"
          style={{
            marginBottom: "1.5rem",
          }}
        />

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#2563EB",
            color: "white",
            fontWeight: "bold",
            padding: "0.75rem",
          }}
        >
          Iniciar Sesión
        </Button>

        <Typography
          variant="body2"
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#6B7280",
            cursor: "pointer",
          }}
          onClick={() =>
            alert("Funcionalidad de recuperar contraseña aún no implementada.")
          }
        >
          ¿Olvidaste tu contraseña?
        </Typography>

        <Typography
          variant="body2"
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#064eff",
            cursor: "pointer",
          }}
          onClick={() => navigate("/register")}
        >
          Registrate aquí
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
