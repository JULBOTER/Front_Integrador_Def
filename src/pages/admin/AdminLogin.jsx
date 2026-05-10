import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

export default function AdminLogin() {
  const { loginAdmin } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = loginAdmin(form.usuario, form.password);
    if (resultado.exito) {
      navigate("/admin/menu");
    } else {
      setError(resultado.error);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/img/log.webp" alt="Solfecon" width="110"
            onError={(e) => { e.target.style.display = "none"; }} />
          <h4>Portal Administrativo</h4>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="campo">
            <label htmlFor="usuario">Usuario</label>
            <input
              id="usuario" name="usuario" type="text"
              value={form.usuario} onChange={handleChange}
              placeholder="Usuario administrador" required
            />
          </div>
          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              placeholder="Contraseña" required
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn-auth">Ingresar</button>
        </form>
        <div className="auth-hint">
          <small>Credenciales: <strong>admin</strong> / <strong>1234</strong></small>
        </div>
      </div>
    </main>
  );
}