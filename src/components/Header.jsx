import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import CartSidebar from "./CartSidebar";

// IMPORTACION DE ICONOS
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar>
        {/* Botón de menú a la izquierda */}

        {/* Logo o nombre de la app */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center", // Centra el texto
            fontWeight: "bold",
            color: "#8eff1c",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#8eff1c",
              fontWeight: "bold",
            }}
          >
            ShopSmart
          </Link>
        </Typography>

        {/* Menú de navegación */}
        {/* <Button
          sx={{ color: "#8eff1c", fontWeight: "bold" }}
          component={Link}
          to="/products"
        >
          Productos
        </Button> */}

        {/* Botón de engranaje */}
        <IconButton
          sx={{ color: "#8eff1c" }}
          onClick={() => navigate("/edit-user")}
        >
          <SettingsIcon />
        </IconButton>

        {/* Botón de carrito */}
        <IconButton
          sx={{ color: "#8eff1c" }}
          onClick={() => toggleSidebar(true)} // Abre el sidebar
        >
          <ShoppingCartIcon />
        </IconButton>

        {/* Botón de logout a la derecha */}
        <IconButton
          sx={{ color: "#8eff1c" }}
          edge="end"
          onClick={() => {
            logout(); // Llama a la función de logout
            navigate("/login"); // Redirige al login
          }}
        >
          <LogoutIcon />
        </IconButton>

        {/* Sidebar del carrito */}
        <CartSidebar
          open={isSidebarOpen} // Estado del sidebar
          onClose={() => toggleSidebar(false)} // Cierra el sidebar
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
