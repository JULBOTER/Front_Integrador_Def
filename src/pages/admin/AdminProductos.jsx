import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrecio } from "../../data/productos";

export default function AdminProductos() {
  const [productos, setProductos] = useState(() =>
    JSON.parse(localStorage.getItem("ProductosCRUD")) || []
  );

  const [lineas] = useState(() =>
    JSON.parse(localStorage.getItem("Productos")) || []
  );
  const [promocionesAdmin] = useState(() =>
    JSON.parse(localStorage.getItem("Promociones")) || []
  );

  const [form, setForm] = useState({
    descripcion: "", precio: "", estado: "", linea: "", promocion: ""
  });
  const [imagenBase64, setImagenBase64] = useState("");
  const [idEdicion, setIdEdicion] = useState(null);
  const [buscar, setBuscar] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagenBase64(ev.target.result);
    reader.readAsDataURL(file);
  };

  const guardar = () => {
    const { descripcion, precio, estado, linea, promocion } = form;
    if (!descripcion || !precio || !estado || !linea || !promocion ||
      (!imagenBase64 && idEdicion === null)) {
      alert("Todos los campos son obligatorios");
      return;
    }
    let nuevos;
    if (idEdicion !== null) {
      nuevos = productos.map((p) =>
        p.id === idEdicion
          ? { ...p, ...form, precio: parseFloat(precio), imagen: imagenBase64 || p.imagen }
          : p
      );
      alert("Producto actualizado");
      setIdEdicion(null);
    } else {
      const nuevo = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        ...form,
        precio: parseFloat(precio),
        imagen: imagenBase64,
      };
      nuevos = [...productos, nuevo];
      alert("Producto guardado");
    }
    localStorage.setItem("ProductosCRUD", JSON.stringify(nuevos));
    setProductos(nuevos);
    limpiar();
  };

  const editar = (id) => {
    const p = productos.find((x) => x.id === id);
    if (!p) return;
    setForm({
      descripcion: p.descripcion,
      precio: p.precio,
      estado: p.estado,
      linea: p.linea,
      promocion: p.promocion
    });
    setIdEdicion(id);
  };

  const eliminar = (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    const nuevos = productos.filter((p) => p.id !== id);
    localStorage.setItem("ProductosCRUD", JSON.stringify(nuevos));
    setProductos(nuevos);
    alert("Producto eliminado");
  };

  const limpiar = () => {
    setForm({ descripcion: "", precio: "", estado: "", linea: "", promocion: "" });
    setImagenBase64("");
  };

  const filtrados = productos.filter((p) =>
    p.descripcion.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <main className="main">
      <div className="admin-header">
        <Link to="/admin/menu" className="btn-admin-back">← Volver al menú</Link>
        <h2 className="titulo2">Administración de Productos</h2>
      </div>

      <div className="admin-card">
        <div className="campo">
          <label>Descripción</label>
          <input name="descripcion" type="text" className="admin-input"
            value={form.descripcion} onChange={handleChange}
            placeholder="Nombre del producto" />
        </div>
        <div className="campo">
          <label>Precio</label>
          <input name="precio" type="number" className="admin-input"
            value={form.precio} onChange={handleChange}
            step="0.01" placeholder="0.00" />
        </div>
        <div className="campo">
          <label>Estado</label>
          <select name="estado" className="admin-input"
            value={form.estado} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="campo">
          <label>Línea de Producto</label>
          <select name="linea" className="admin-input"
            value={form.linea} onChange={handleChange}>
            <option value="">Seleccione</option>
            {lineas.map((l) => (
              <option key={l.id} value={l.id}>
                {l.id} - {l.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label>Promoción</label>
          <select name="promocion" className="admin-input"
            value={form.promocion} onChange={handleChange}>
            <option value="">Seleccione</option>
            {promocionesAdmin.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label>Imagen</label>
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
          placeholder="Buscar producto..."
          value={buscar} onChange={(e) => setBuscar(e.target.value)} />
      </div>

      <div className="tabla-contenedor">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Línea</th>
              <th>Promoción</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => {
              const lineaObj = lineas.find((l) => String(l.id) === String(p.linea));
              const promoObj = promocionesAdmin.find((pr) => String(pr.id) === String(p.promocion));
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.descripcion}</td>
                  <td>{formatPrecio(p.precio)}</td>
                  <td>{p.estado}</td>
                  {/* ✅ Línea: ID - Descripción */}
                  <td>
                    {lineaObj
                      ? `${lineaObj.id} - ${lineaObj.descripcion}`
                      : p.linea}
                  </td>
                  {/* ✅ Promoción: ID - Descripción (igual que línea) */}
                  <td>
                    {promoObj
                      ? `${promoObj.id} - ${promoObj.descripcion}`
                      : p.promocion}
                  </td>
                  <td><img src={p.imagen} width="60" alt={p.descripcion} /></td>
                  <td>
                    <button className="btn-admin-editar" onClick={() => editar(p.id)}>
                      Editar
                    </button>
                    <button className="btn-admin-eliminar" onClick={() => eliminar(p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtrados.length === 0 && (
              <tr><td colSpan={8}>No hay registros</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}