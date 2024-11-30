import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const toggleDrawer = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  const menuItems = [
    { text: "Productos", path: "/productos" },
    { text: "Carrito", path: "/clientes/carrito" },
    { text: "Cuenta", path: "/clientes/cuenta" },
    { text: "Administración", path: "/admin" },
    { text: "Proveedores", path: "/proveedores/ordenes" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar>
        {/* Botón de menú a la izquierda */}
        <IconButton
          edge="start"
          sx={{ color: "#8eff1c" }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

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

        {/* Sidebar del menu */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)} // Cierra el Drawer al hacer clic fuera
        >
          <List sx={{ width: 250 }}>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  navigate(item.path); // Navegar al hacer clic en el item
                  toggleDrawer(false); // Cerrar el Drawer después de la navegación
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
