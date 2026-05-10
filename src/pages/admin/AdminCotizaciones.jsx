import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrecio } from "../../data/productos";

export default function AdminCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    cargarCotizaciones();
  }, []);

  const cargarCotizaciones = () => {
    try {
      const guardadas = JSON.parse(
        localStorage.getItem("solfecon_cotizaciones")
      ) || [];
      setCotizaciones(guardadas);
    } catch {
      setCotizaciones([]);
    }
  };

  const eliminar = (id) => {
    if (!confirm("¿Eliminar esta cotización?")) return;
    const nuevas = cotizaciones.filter((c) => c.id !== id);
    localStorage.setItem("solfecon_cotizaciones", JSON.stringify(nuevas));
    setCotizaciones(nuevas);
    if (detalle?.id === id) setDetalle(null);
    alert("Cotización eliminada con éxito");
  };

  const filtradas = cotizaciones.filter((c) =>
    String(c.id).includes(buscar) ||
    c.nombreCliente.toLowerCase().includes(buscar.toLowerCase()) ||
    c.cedulaCliente.includes(buscar) ||
    c.fecha.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="main">
      <div className="admin-header">
        <Link to="/admin/menu" className="btn-admin-back">← Volver al menú</Link>
        <h2 className="titulo2">Administración de Cotizaciones</h2>
      </div>

      {/* Buscador */}
      <div className="admin-buscar">
        <input
          type="text"
          className="admin-input"
          placeholder="Buscar por ID, cliente, cédula o fecha..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
      </div>

      {/* Detalle cotización */}
      {detalle && (
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <h3 style={{ color: "var(--rojo)" }}>
              Detalle — Cotización #{detalle.id}
            </h3>
            <button className="btn-admin-cancelar" onClick={() => setDetalle(null)}>
              Cerrar
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            margin: "12px 0",
            fontSize: "0.95rem"
          }}>
            <p><strong>ID Cotización:</strong> {detalle.id}</p>
            <p><strong>Fecha:</strong> {detalle.fecha}</p>
            <p><strong>Cliente:</strong> {detalle.nombreCliente}</p>
            <p><strong>Cédula:</strong> {detalle.cedulaCliente}</p>
            <p><strong>Total:</strong> {formatPrecio(detalle.total)}</p>
          </div>

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
                {(detalle.detalles || detalle.items || []).map((det, i) => {
                  const idDetalle = det.id_detalle_cotizacion || (i + 1);
                  const idCot = det.id_cotizacion || detalle.id;
                  const idProd = det.id_producto || det.id;
                  const nombre = det.nombre;
                  const precio = det.precio_unitario || det.precio;
                  const cantidad = det.cantidad;
                  return (
                    <tr key={idDetalle}>
                      <td>
                        <span className="producto-id">{idDetalle}</span>
                      </td>
                      <td>
                        <span className="producto-id">{idCot}</span>
                      </td>
                      <td>
                        <span className="producto-id">{idProd}</span>
                      </td>
                      <td>{nombre}</td>
                      <td>{formatPrecio(precio)}</td>
                      <td>{cantidad}</td>
                      <td>{formatPrecio(precio * cantidad)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="cotizacion-total-row">
                  <td colSpan={6}><strong>TOTAL</strong></td>
                  <td><strong>{formatPrecio(detalle.total)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Tabla principal */}
      <div className="tabla-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>ID Cotización</th>
              <th>Fecha</th>
              <th>Cédula Cliente</th>
              <th>Nombre Cliente</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  {cotizaciones.length === 0
                    ? "No hay cotizaciones registradas aún."
                    : "No se encontraron resultados."}
                </td>
              </tr>
            ) : (
              filtradas.map((cot) => (
                <tr key={cot.id}>
                  <td>
                    <span className="producto-id">{cot.id}</span>
                  </td>
                  <td>{cot.fecha}</td>
                  <td>{cot.cedulaCliente}</td>
                  <td>{cot.nombreCliente}</td>
                  <td>{formatPrecio(cot.total)}</td>
                  <td>
                    <button
                      className="btn-admin-editar"
                      onClick={() => setDetalle(cot)}
                    >
                      Ver detalle
                    </button>
                    <button
                      className="btn-admin-eliminar"
                      onClick={() => eliminar(cot.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: "16px",
        color: "#888",
        fontSize: "0.9rem",
        textAlign: "center"
      }}>
        Total de cotizaciones: <strong>{cotizaciones.length}</strong>
      </div>
    </main>
  );
}