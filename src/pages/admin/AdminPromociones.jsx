import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPromociones() {
  const [promociones, setPromociones] = useState(() =>
    JSON.parse(localStorage.getItem("Promociones")) || []
  );
  const [form, setForm] = useState({ descripcion: "", descuento: "" });
  const [imagenBase64, setImagenBase64] = useState("");
  const [idEdicion, setIdEdicion] = useState(null);
  const [buscar, setBuscar] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagenBase64(ev.target.result);
    reader.readAsDataURL(file);
  };

  const guardar = () => {
    if (!form.descripcion || !form.descuento) {
      alert("Descripción y descuento son obligatorios");
      return;
    }
    if (form.descuento < 0 || form.descuento > 100) {
      alert("El descuento debe estar entre 0 y 100");
      return;
    }
    let nuevas;
    if (idEdicion !== null) {
      nuevas = promociones.map((p) =>
        p.id === idEdicion
          ? {
              ...p,
              descripcion: form.descripcion,
              descuento: Number(form.descuento),
              imagen: imagenBase64 || p.imagen
            }
          : p
      );
      alert("Registro modificado con éxito");
      setIdEdicion(null);
    } else {
      const nuevo = {
        id: promociones.length ? promociones[promociones.length - 1].id + 1 : 1,
        descripcion: form.descripcion,
        descuento: Number(form.descuento),
        imagen: imagenBase64 || "",
      };
      nuevas = [...promociones, nuevo];
      alert("Registro guardado con éxito");
    }
    localStorage.setItem("Promociones", JSON.stringify(nuevas));
    setPromociones(nuevas);
    limpiar();
  };

  const editar = (id) => {
    const p = promociones.find((x) => x.id === id);
    if (!p) return;
    setForm({ descripcion: p.descripcion, descuento: p.descuento });
    setIdEdicion(id);
  };

  const eliminar = (id) => {
    if (!confirm("¿Eliminar este registro?")) return;
    const nuevas = promociones.filter((p) => p.id !== id);
    localStorage.setItem("Promociones", JSON.stringify(nuevas));
    setPromociones(nuevas);
    alert("Registro eliminado con éxito");
  };

  const limpiar = () => {
    setForm({ descripcion: "", descuento: "" });
    setImagenBase64("");
  };

  const filtradas = promociones.filter((p) =>
    p.descripcion.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="main">
      <div className="admin-header">
        <Link to="/admin/menu" className="btn-admin-back">← Volver al menú</Link>
        <h2 className="titulo2">Administración de Promociones</h2>
      </div>

      <div className="admin-card">
        <div className="campo">
          <label>Descripción *</label>
          <input name="descripcion" type="text" className="admin-input"
            value={form.descripcion} onChange={handleChange}
            placeholder="Nombre de la promoción" />
        </div>
        <div className="campo">
          <label>Descuento (%) *</label>
          <input name="descuento" type="number" className="admin-input"
            value={form.descuento} onChange={handleChange}
            min="0" max="100" placeholder="Ej: 20" />
        </div>
        <div className="campo">
          <label>Imagen (opcional)</label>
          <input type="file" className="admin-input"
            accept="image/*" onChange={handleImagen} />
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn-admin-guardar" onClick={guardar}>
            {idEdicion !== null ? "Actualizar" : "Guardar"}
          </button>
          {idEdicion !== null && (
            <button className="btn-admin-cancelar"
              onClick={() => { setIdEdicion(null); limpiar(); }}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="admin-buscar">
        <input type="text" className="admin-input"
          placeholder="Buscar por descripción..."
          value={buscar} onChange={(e) => setBuscar(e.target.value)} />
      </div>

      <div className="tabla-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Descuento</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((p) => (
              <tr key={p.id}>
                <td><span className="producto-id">{p.id}</span></td>
                <td>{p.descripcion}</td>
                <td>{p.descuento}%</td>
                <td>
                  {p.imagen
                    ? <img src={p.imagen} width="60" alt={p.descripcion} />
                    : <span style={{ color: "#bbb", fontSize: "0.85rem" }}>Sin imagen</span>
                  }
                </td>
                <td>
                  <button className="btn-admin-editar" onClick={() => editar(p.id)}>
                    Editar
                  </button>
                  <button className="btn-admin-eliminar" onClick={() => eliminar(p.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filtradas.length === 0 && (
              <tr><td colSpan={5}>No hay registros</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}