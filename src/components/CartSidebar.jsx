import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useCart } from "../context/CartContext";

const CartSidebar = ({ open, onClose }) => {
  const { cart } = useCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          height: "100%", // Ocupa toda la altura del Drawer
        }}
      >
        {/* Título del carrito */}
        <div style={{ padding: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            Carrito de Compras
          </Typography>
        </div>

        {/* Lista de productos */}
        <List style={{ flexGrow: 1, padding: "0 1rem" }}>
          {cart?.items.map((item) => (
            <ListItem
              key={item.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <img
                src={
                  item.product.images[0]?.downloadUrl
                    ? `${import.meta.env.VITE_BACKEND_URL}${
                        item.product.images[0].downloadUrl
                      }`
                    : "/placeholder.jpg"
                }
                alt={item.product.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  marginRight: "1rem",
                }}
              /> */}
              <ListItemText
                primary={item.product.name}
                secondary={`Precio: $${item.product.price}`}
              />
            </ListItem>
          ))}
        </List>

        {/* Botón Cerrar */}
        <div style={{ padding: "1rem", borderTop: "1px solid #ddd" }}>
          <Button variant="contained" color="error" onClick={onClose} fullWidth>
            Cerrar
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CartSidebar;
