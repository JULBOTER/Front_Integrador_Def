import { useParams, Navigate } from "react-router-dom";
import { promociones, getProductosPorPromocion } from "../../data/productos";
import ProductoCard from "../../components/ProductoCard";

export default function PromocionPage() {
  const { id } = useParams();

  const promo = promociones.find((p) => p.id === id);
  if (!promo) return <Navigate to="/" replace />;

  const listaProductos = getProductosPorPromocion(id);

  return (
    <main className="main">
      <div className="promo-header">
        <h2 className="titulo2">
          {promo.nombre}
          {promo.descuento > 0 && (
            <span className="promo-badge"> — {promo.descuento}% OFF</span>
          )}
        </h2>
        <p className="promo-fechas">
          Vigente del <strong>{promo.fechaInicio}</strong> al{" "}
          <strong>{promo.fechaFin}</strong>
        </p>
      </div>

      {listaProductos.length === 0 ? (
        <div className="crud-vacio-aviso">
          <p>⚠️ No hay productos registrados en esta promoción.</p>
        </div>
      ) : (
        <div className="productos-grid">
          {listaProductos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} descuento={promo.descuento} />
          ))}
        </div>
      )}
    </main>
  );
}