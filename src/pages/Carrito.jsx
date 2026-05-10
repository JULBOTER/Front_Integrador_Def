import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { formatPrecio } from "../data/productos";

export default function Carrito() {
  const { items, eliminarProducto, vaciarCarrito, totalPrecio } = useCarrito();
  const navigate = useNavigate();

  const handleGenerarCotizacion = () => {
    const snapshot = items.map((i) => ({ ...i }));
    vaciarCarrito();
    navigate("/cotizacion", { state: { items: snapshot, total: totalPrecio } });
  };

  if (items.length === 0) {
    return (
      <main className="main">
        <h2 className="titulo2">Tu carrito de compras</h2>
        <div className="carrito-vacio">
          <p>🛒 Tu carrito está vacío.</p>
          <Link to="/" className="btn-comprar">Ver productos</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <h2 className="titulo2">Tu carrito de compras</h2>
      <div className="tabla-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="producto-id">{item.id}</span>
                </td>
                <td>{item.nombre}</td>
                <td>{formatPrecio(item.precio)}</td>
                <td>{item.cantidad}</td>
                <td>{formatPrecio(item.precio * item.cantidad)}</td>
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="carrito-total">
        <p className="total-precio">
          <strong>Total: {formatPrecio(totalPrecio)}</strong>
        </p>
        <div className="carrito-acciones">
          <button className="btn-vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
          <Link to="/" className="btn-comprar">
            Seguir comprando
          </Link>
          <button className="btn-cotizacion" onClick={handleGenerarCotizacion}>
            📄 Generar cotización
          </button>
        </div>
      </div>
    </main>
  );
}