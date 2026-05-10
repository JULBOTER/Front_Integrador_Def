import { useParams, Navigate } from "react-router-dom";
import { categorias, getProductosPorCategoria } from "../../data/productos";
import ProductoCard from "../../components/ProductoCard";

export default function CategoriaPage() {
  const { id } = useParams();

  const categoria = categorias.find((c) => c.id === id);
  if (!categoria) return <Navigate to="/" replace />;

  const lista = getProductosPorCategoria(id);

  return (
    <main className="main">
      <h2 className="titulo2">{categoria.nombre}</h2>
      {lista.length === 0 ? (
        <div className="crud-vacio-aviso">
          <p>⚠️ No hay productos registrados en esta categoría.</p>
        </div>
      ) : (
        <div className="productos-grid">
          {lista.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </main>
  );
}