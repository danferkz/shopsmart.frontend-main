// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar páginas
import Register from './pages/Clientes/Register';
import Login from './pages/Clientes/Login';
import Productos from './pages/Clientes/Productos.jsx';
import CuentaUsuario from './pages/Clientes/Cuentausuario';

import Administracion from './pages/Admin/Administracion';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProveedores from './pages/Admin/AdminProveedores';
import AdminOrdenes from './pages/Admin/AdminOrdenes';
import AdminClientes from './pages/Admin/AdminClientes';
import AdminAdmins from './pages/Admin/AdminAdmins';

import ProveedorOrdenes from './pages/Proveedores/ProveedorOrdenes';
import Unauthorized from './pages/Unauthorized';

const App = () => {
  // Variables simuladas para autenticación y roles
  const isAuthenticated = true; // Cambia esto según tu lógica
  const userRole = 'admin'; // 'cliente', 'admin', 'proveedor'

  // Componente para rutas protegidas
  const ProtectedRoute = ({ children, role }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (role && userRole !== role) {
      return <Navigate to="/unauthorized" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<Productos />} />

        {/* Rutas protegidas para clientes */}
        <Route
          path="/cuentausuario"
          element={
            <ProtectedRoute role="cliente">
              <CuentaUsuario />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para administradores */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Administracion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/proveedores"
          element={
            <ProtectedRoute role="admin">
              <AdminProveedores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ordenes"
          element={
            <ProtectedRoute role="admin">
              <AdminOrdenes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/clientes"
          element={
            <ProtectedRoute role="admin">
              <AdminClientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admins"
          element={
            <ProtectedRoute role="admin">
              <AdminAdmins />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas para proveedores */}
        <Route
          path="/proveedores/ordenes"
          element={
            <ProtectedRoute role="proveedor">
              <ProveedorOrdenes />
            </ProtectedRoute>
          }
        />

        {/* Ruta para acceso no autorizado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
