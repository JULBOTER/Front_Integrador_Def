import { useCarrito } from "../context/CarritoContext";
import { formatPrecio } from "../data/productos";

export default function ProductoCard({ producto, descuento = 0 }) {
  const { agregarProducto } = useCarrito();

  const activo = producto.estado === "Activo";

  const precioFinal = descuento > 0
    ? producto.precio * (1 - descuento / 100)
    : producto.precio;

  return (
    <div className={`producto-card ${!activo ? "producto-inactivo" : ""}`}>
      <div className="producto-img-wrap">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="producto-img"
            onError={(e) => {
              e.target.src = "https://placehold.co/300x200?text=Sin+imagen";
            }}
          />
        ) : (
          <div className="producto-img-vacio">
            <span>Sin imagen</span>
          </div>
        )}
        {descuento > 0 && activo && (
          <span className="badge-descuento">-{descuento}%</span>
        )}
        {!activo && (
          <span className="badge-inactivo">Inactivo</span>
        )}
      </div>

      <div className="producto-body">
        <h5 className="producto-nombre">
          <span className="producto-id">{producto.id}</span>{" "}
          {producto.nombre || "Sin descripción"}
        </h5>

        {producto.precio ? (
          <>
            {descuento > 0 && activo && (
              <p className="precio-original">{formatPrecio(producto.precio)}</p>
            )}
            <p className="precio-final">
              {formatPrecio(activo ? precioFinal : producto.precio)}
              <small> c/IVA</small>
            </p>
          </>
        ) : (
          <p className="precio-final" style={{ color: "#aaa" }}>Sin precio</p>
        )}

        <div className="producto-acciones">
          {activo && producto.link ? (
            <a href={producto.link} target="_blank" rel="noreferrer" className="btn-comprar">
              Comprar
            </a>
          ) : (
            <button className="btn-comprar" disabled style={{ opacity: 0.4, cursor: "not-allowed" }}>
              Comprar
            </button>
          )}
          <button
            className="btn-agregar"
            disabled={!activo}
            style={!activo ? { opacity: 0.4, cursor: "not-allowed" } : {}}
            onClick={() => activo && agregarProducto({ ...producto, precio: precioFinal })}
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  );
}