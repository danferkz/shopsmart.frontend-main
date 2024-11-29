// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Páginas Clientes
import Register from "./pages/Clientes/Register";
import Login from "./pages/Clientes/Login";
import Productos from "./pages/Clientes/Productos";
import CuentaUsuario from "./pages/Clientes/Cuentausuario";
import Carrito from './pages/Clientes/Carrito';

// Páginas Admin
import Administracion from "./pages/Admin/Administracion";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProveedores from "./pages/Admin/AdminProveedores";
import AdminOrdenes from "./pages/Admin/AdminOrdenes";
import AdminClientes from "./pages/Admin/AdminClientes";
import AdminAdmins from "./pages/Admin/AdminAdmins";

// Páginas Proveedores
import ProveedorOrdenes from "./pages/Proveedores/ProveedorOrdenes";

// Página de Unauthorized
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Rutas de Clientes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes/cuenta" element={<CuentaUsuario />} />
        <Route path="/clientes/carrito" element={<Carrito />} />

        {/* Rutas de Admin */}
        <Route path="/admin" element={<Administracion />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/proveedores" element={<AdminProveedores />} />
        <Route path="/admin/ordenes" element={<AdminOrdenes />} />
        <Route path="/admin/clientes" element={<AdminClientes />} />
        <Route path="/admin/admins" element={<AdminAdmins />} />

        {/* Rutas de Proveedores */}
        <Route path="/proveedores/ordenes" element={<ProveedorOrdenes />} />

        {/* Página de Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Página por defecto en caso de ruta no encontrada */}
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </div>
  );
};

export default App;
