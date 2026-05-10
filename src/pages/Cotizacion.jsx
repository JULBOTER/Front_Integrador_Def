import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatPrecio } from "../data/productos";

export default function Cotizacion() {
  const { state } = useLocation();
  const { usuario } = useAuth();
  const guardado = useRef(false);
  const [idCotizacionMostrar, setIdCotizacionMostrar] = useState(null);
  const [detallesMostrar, setDetallesMostrar] = useState([]);

  if (!state || !state.items || state.items.length === 0) {
    return (
      <main className="main">
        <h2 className="titulo2">Cotización</h2>
        <div className="carrito-vacio">
          <p>No hay datos de cotización disponibles.</p>
          <Link to="/" className="btn-comprar">Volver al inicio</Link>
        </div>
      </main>
    );
  }

  const { items, total } = state;

  const fecha = new Date().toLocaleDateString("es-CO", {
    year: "numeric", month: "long", day: "numeric"
  });

  // Obtener datos del cliente
  const clientes = JSON.parse(localStorage.getItem("solfecon_clientes")) || [];
  const clienteActual = clientes.find((c) => c.usuario === usuario?.usuario);
  const cedulaCliente = clienteActual?.password || "—";
  const nombreCliente = clienteActual?.nombre || usuario?.nombre || "—";

  useEffect(() => {
    if (guardado.current) return;
    guardado.current = true;

    // — ID Cotización: máximo existente + 1 —
    const cotizaciones = JSON.parse(
      localStorage.getItem("solfecon_cotizaciones")
    ) || [];
    const nuevaIdCot = cotizaciones.length > 0
      ? Math.max(...cotizaciones.map((c) => c.id)) + 1
      : 1;

    // — ID Detalle: máximo existente en TODOS los detalles activos + 1 —
    // Recorre todas las cotizaciones activas y saca el max id_detalle_cotizacion
    const todosLosDetalles = cotizaciones.flatMap((c) => c.detalles || []);
    const maxIdDetalle = todosLosDetalles.length > 0
      ? Math.max(...todosLosDetalles.map((d) => d.id_detalle_cotizacion))
      : 0;

    // Construir detalles con id_detalle incremental desde el máximo actual
    let contadorDetalle = maxIdDetalle;
    const detalles = items.map((item) => {
      contadorDetalle += 1;
      return {
        id_detalle_cotizacion: contadorDetalle,
        id_cotizacion: nuevaIdCot,
        id_producto: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
      };
    });

    // Guardar cotización con sus detalles
    const nueva = {
      id: nuevaIdCot,
      fecha,
      cedulaCliente,
      nombreCliente,
      items,
      detalles,
      total,
    };

    localStorage.setItem(
      "solfecon_cotizaciones",
      JSON.stringify([...cotizaciones, nueva])
    );

    setIdCotizacionMostrar(nuevaIdCot);
    setDetallesMostrar(detalles);
  }, []);

  // Calcular ID a mostrar antes de que se guarde
  const cotizacionesActuales = JSON.parse(
    localStorage.getItem("solfecon_cotizaciones")
  ) || [];
  const idMostrar = idCotizacionMostrar || (
    cotizacionesActuales.length > 0
      ? Math.max(...cotizacionesActuales.map((c) => c.id)) + 1
      : 1
  );

  const detallesMostrados = detallesMostrar.length > 0
    ? detallesMostrar
    : items.map((item, i) => ({
        id_detalle_cotizacion: i + 1,
        id_cotizacion: idMostrar,
        id_producto: item.id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
      }));

  return (
    <main className="main">
      <div className="cotizacion-container">

        {/* Encabezado */}
        <div className="cotizacion-header">
          <div className="cotizacion-logo">
            <img src="/img/log.webp" alt="Solfecon" width="90"
              onError={(e) => { e.target.style.display = "none"; }} />
          </div>
          <div className="cotizacion-info">
            <h2 className="cotizacion-titulo">Cotización</h2>
            <p><strong>ID Cotización:</strong> {idMostrar}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Cliente:</strong> {nombreCliente}</p>
            <p><strong>Cédula Cliente:</strong> {cedulaCliente}</p>
          </div>
        </div>

        {/* Tabla de detalle */}
        <div className="tabla-contenedor">
          <table className="table">
            <thead>
              <tr>
                <th>ID Detalle</th>
                <th>ID Cotización</th>
                <th>ID Producto</th>
                <th>Producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detallesMostrados.map((det) => (
                <tr key={det.id_detalle_cotizacion}>
                  <td>
                    <span className="producto-id">
                      {det.id_detalle_cotizacion}
                    </span>
                  </td>
                  <td>
                    <span className="producto-id">
                      {det.id_cotizacion}
                    </span>
                  </td>
                  <td>
                    <span className="producto-id">
                      {det.id_producto}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }}>{det.nombre}</td>
                  <td>{formatPrecio(det.precio_unitario)}</td>
                  <td>{det.cantidad}</td>
                  <td>{formatPrecio(det.precio_unitario * det.cantidad)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="cotizacion-total-row">
                <td colSpan={6}><strong>TOTAL</strong></td>
                <td><strong>{formatPrecio(total)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Nota */}
        <div className="cotizacion-nota">
          <p>
            <strong>Nota:</strong> Esta cotización tiene validez de{" "}
            <strong>30 días</strong> a partir de la fecha de emisión.
            Los precios incluyen IVA.
          </p>
        </div>

        {/* Acciones */}
        <div className="cotizacion-acciones">
          <button className="btn-imprimir" onClick={() => window.print()}>
            🖨️ Imprimir / Guardar PDF
          </button>
          <Link to="/" className="btn-comprar">
            🏠 Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}