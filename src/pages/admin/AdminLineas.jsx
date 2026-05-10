import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminLineas() {
  const [lineas, setLineas] = useState(() =>
    JSON.parse(localStorage.getItem("Productos")) || []
  );
  const [descripcion, setDescripcion] = useState("");
  const [imagenBase64, setImagenBase64] = useState("");
  const [idEdicion, setIdEdicion] = useState(null);
  const [buscar, setBuscar] = useState("");

  const guardar = () => {
    if (!descripcion || (!imagenBase64 && idEdicion === null)) {
      alert("Todos los campos son obligatorios");
      return;
    }
    let nuevas;
    if (idEdicion !== null) {
      nuevas = lineas.map((l) =>
        l.id === idEdicion
          ? { ...l, descripcion, imagen: imagenBase64 || l.imagen }
          : l
      );
      alert("Registro modificado con éxito");
      setIdEdicion(null);
    } else {
      const nuevo = {
        id: lineas.length ? lineas[lineas.length - 1].id + 1 : 1,
        descripcion,
        imagen: imagenBase64,
      };
      nuevas = [...lineas, nuevo];
      alert("Registro guardado con éxito");
    }
    localStorage.setItem("Productos", JSON.stringify(nuevas));
    setLineas(nuevas);
    limpiar();
  };

  const editar = (id) => {
    const l = lineas.find((x) => x.id === id);
    if (!l) return;
    setDescripcion(l.descripcion);
    setIdEdicion(id);
  };

  const eliminar = (id) => {
    if (!confirm("¿Eliminar este registro?")) return;
    const nuevas = lineas.filter((l) => l.id !== id);
    localStorage.setItem("Productos", JSON.stringify(nuevas));
    setLineas(nuevas);
    alert("Registro eliminado con éxito");
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagenBase64(ev.target.result);
    reader.readAsDataURL(file);
  };

  const limpiar = () => {
    setDescripcion("");
    setImagenBase64("");
  };

  const filtradas = lineas.filter((l) =>
    l.descripcion.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="main">
      <div className="admin-header">
        <Link to="/admin/menu" className="btn-admin-back">← Volver al menú</Link>
        <h2 className="titulo2">Administración de Líneas de Producto</h2>
      </div>

      {/* Formulario */}
      <div className="admin-card">
        <div className="campo">
          <label>Descripción</label>
          <input type="text" className="admin-input" value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción de la línea" />
        </div>
        <div className="campo">
          <label>Imagen</label>
          <input type="file" className="admin-input" accept="image/*" onChange={handleImagen} />
        </div>
        <button className="btn-admin-guardar" onClick={guardar}>
          {idEdicion !== null ? "Actualizar" : "Guardar"}
        </button>
        {idEdicion !== null && (
          <button className="btn-admin-cancelar" onClick={() => { setIdEdicion(null); limpiar(); }}>
            Cancelar
          </button>
        )}
      </div>

      {/* Buscador */}
      <div className="admin-buscar">
        <input type="text" className="admin-input" placeholder="Buscar por descripción..."
          value={buscar} onChange={(e) => setBuscar(e.target.value)} />
      </div>

      {/* Tabla */}
      <div className="tabla-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.descripcion}</td>
                <td><img src={l.imagen} width="60" alt={l.descripcion} /></td>
                <td>
                  <button className="btn-admin-editar" onClick={() => editar(l.id)}>Editar</button>
                  <button className="btn-admin-eliminar" onClick={() => eliminar(l.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {filtradas.length === 0 && (
              <tr><td colSpan={4}>No hay registros</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}