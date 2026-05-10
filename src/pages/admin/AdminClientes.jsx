import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [editando, setEditando] = useState(null);

  const cargarClientes = () => {
    try {
      const todos = JSON.parse(localStorage.getItem("solfecon_clientes")) || [];
      const soloClientes = todos.filter(
        (u) => u.usuario !== "admin" && /^\d+$/.test(u.password)
      );
      setClientes(soloClientes);
    } catch {
      setClientes([]);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const guardarEnStorage = (lista) => {
    try {
      const todos = JSON.parse(localStorage.getItem("solfecon_clientes")) || [];
      const sistema = todos.filter(
        (u) => u.usuario === "admin" || !/^\d+$/.test(u.password)
      );
      localStorage.setItem(
        "solfecon_clientes",
        JSON.stringify([...sistema, ...lista])
      );
    } catch {}
  };

  const iniciarEdicion = (cliente) => {
    setEditando({ usuario: cliente.usuario, nombre: cliente.nombre });
  };

  const guardarEdicion = () => {
    if (!editando.nombre.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }
    const nuevos = clientes.map((c) =>
      c.usuario === editando.usuario ? { ...c, nombre: editando.nombre } : c
    );
    guardarEnStorage(nuevos);
    setClientes(nuevos);
    setEditando(null);
    alert("Cliente actualizado con éxito");
  };

  const eliminar = (usuario) => {
    if (!confirm("¿Eliminar este cliente?")) return;
    const nuevos = clientes.filter((c) => c.usuario !== usuario);
    guardarEnStorage(nuevos);
    setClientes(nuevos);
    alert("Cliente eliminado con éxito");
  };

  const filtrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
    c.password.includes(buscar)
  );

  return (
    <main className="main">
      <div className="admin-header">
        <Link to="/admin/menu" className="btn-admin-back">← Volver al menú</Link>
        <h2 className="titulo2">Administración de Clientes</h2>
      </div>

      {/* Buscador */}
      <div className="admin-buscar">
        <input
          type="text"
          className="admin-input"
          placeholder="Buscar por nombre o cédula..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
        />
      </div>

      {/* Modal edición */}
      {editando && (
        <div className="admin-card">
          <h3 style={{ color: "var(--rojo)", marginBottom: "8px" }}>
            Editar Cliente — Cédula: {editando.usuario}
          </h3>
          <div className="campo">
            <label>Nombre completo</label>
            <input
              type="text"
              className="admin-input"
              value={editando.nombre}
              onChange={(e) =>
                setEditando({ ...editando, nombre: e.target.value })
              }
              placeholder="Nombre completo del cliente"
            />
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button className="btn-admin-guardar" onClick={guardarEdicion}>
              Actualizar
            </button>
            <button
              className="btn-admin-cancelar"
              onClick={() => setEditando(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="tabla-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>ID Cliente (Cédula)</th>
              <th>Nombre Completo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  {clientes.length === 0
                    ? "No hay clientes registrados aún."
                    : "No se encontraron resultados."}
                </td>
              </tr>
            ) : (
              filtrados.map((cliente) => (
                <tr key={cliente.usuario}>
                  <td>
                    <span className="producto-id">{cliente.password}</span>
                  </td>
                  <td>{cliente.nombre}</td>
                  <td>
                    <button
                      className="btn-admin-editar"
                      onClick={() => iniciarEdicion(cliente)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-admin-eliminar"
                      onClick={() => eliminar(cliente.usuario)}
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
        Total de clientes registrados: <strong>{clientes.length}</strong>
      </div>
    </main>
  );
}