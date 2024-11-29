import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// COMPONENTS
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

// PAGES
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import EditUser from "./pages/EditUser";
import NotFound from "./pages/NotFound";

// CONTEXT
import { useAuth } from "./context/AuthContext";
import RegisterUser from "./pages/RegisterUser";

const Layout = ({ children }) => {
  const location = useLocation();

  // Ocultar el Header para las rutas de login y register
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return ( 
    <div>
      {/* Renderiza el Header solo si no estamos en las rutas de login o register */}
      {!shouldHideHeader && <Header />}
      {children}
    </div>
  );
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Ruta pública */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/products" /> : <Login />}
          />

          {/* Ruta pública para registrar */}
          <Route path="/register" element={<RegisterUser />} />

          {/* Rutas protegidas */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-user"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />

          {/* Redirigir la raíz al login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Redirigir a ruta no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
