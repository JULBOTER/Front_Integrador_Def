import { useParams, Navigate } from "react-router-dom";
import { getLineasActivas, getProductosPorCategoria } from "../../data/productos";
import ProductoCard from "../../components/ProductoCard";

export default function CategoriaPage() {
  const { id } = useParams();

  const lineas = getLineasActivas();
  const categoria = lineas.find((c) => String(c.id) === String(id));

  if (!categoria) return <Navigate to="/" replace />;

  const lista = getProductosPorCategoria(id);

  // ✅ Leer promociones del CRUD para obtener el descuento de cada producto
  const promocionesAdmin = JSON.parse(localStorage.getItem("Promociones")) || [];
  const productosAdmin = JSON.parse(localStorage.getItem("ProductosCRUD")) || [];

  return (
    <main className="main">
      <h2 className="titulo2">{categoria.nombre}</h2>
      {lista.length === 0 ? (
        <div className="crud-vacio-aviso">
          <p>⚠️ No hay productos registrados en esta categoría.</p>
        </div>
      ) : (
        <div className="productos-grid">
          {lista.map((producto) => {
            // ✅ Buscar el producto en el CRUD para obtener su promoción
            const productoCRUD = productosAdmin.find(
              (p) => String(p.id) === String(producto.id)
            );

            // ✅ Buscar la promoción asignada al producto
            const promocion = productoCRUD
              ? promocionesAdmin.find(
                  (pr) => String(pr.id) === String(productoCRUD.promocion)
                )
              : null;

            // ✅ Descuento de la promoción asignada (0 si no tiene)
            const descuento = promocion ? Number(promocion.descuento) : 0;

            return (
              <ProductoCard
                key={producto.id}
                producto={producto}
                descuento={descuento}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}