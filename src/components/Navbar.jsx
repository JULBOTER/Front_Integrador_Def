import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { categorias, promociones } from "../data/productos";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const { totalItems } = useCarrito();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropLineas, setDropLineas] = useState(false);
  const [dropPromos, setDropPromos] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo + Marca */}
        <Link to="/" className="navbar-logo">
          <img src="/img/log.webp" alt="Solfecon" width="80" height="65" />
          <span className="navbar-brand-text"></span>
        </Link>

        {/* Botón hamburguesa */}
        <button className="hamburger" onClick={() => setMenuAbierto(!menuAbierto)}>
          ☰
        </button>

        {/* Links */}
        <div className={`navbar-links ${menuAbierto ? "abierto" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuAbierto(false)}>
            Nosotros
          </Link>

          <a href="https://solfecon.com/contacto-2/" className="nav-link"
            target="_blank" rel="noreferrer">
            Contáctanos
          </a>

          {/* Dropdown Líneas */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropLineas(true)}
            onMouseLeave={() => setDropLineas(false)}
          >
            <span className="nav-link dropdown-toggle">Líneas de Producto ▾</span>
            {dropLineas && (
              <ul className="dropdown-menu">
                {categorias.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={cat.ruta}
                      className="dropdown-item"
                      onClick={() => { setDropLineas(false); setMenuAbierto(false); }}
                    >
                      {cat.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dropdown Promociones */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropPromos(true)}
            onMouseLeave={() => setDropPromos(false)}
          >
            <span className="nav-link dropdown-toggle">Promociones ▾</span>
            {dropPromos && (
              <ul className="dropdown-menu">
                {promociones.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={p.ruta}
                      className="dropdown-item"
                      onClick={() => { setDropPromos(false); setMenuAbierto(false); }}
                    >
                      {p.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Carrito */}
          <Link to="/carrito" className="nav-link carrito-link"
            onClick={() => setMenuAbierto(false)}>
            🛒 Carrito {totalItems > 0 && (
              <span className="carrito-badge">{totalItems}</span>
            )}
          </Link>

          {/* Auth */}
          {usuario ? (
            <div className="dropdown"
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <span className="nav-link usuario-nombre">👤 {usuario.nombre}</span>
              <button className="btn-logout" onClick={handleLogout}>Salir</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Link
                to="/login"
                className="nav-link btn-login"
                onClick={() => setMenuAbierto(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/admin/login"
                className="nav-link btn-admin-login"
                onClick={() => setMenuAbierto(false)}
              >
                🔐 Administración
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}