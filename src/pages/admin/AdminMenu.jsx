import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

export default function AdminMenu() {
  const { logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <main className="main">
      <div className="admin-menu-container">
        <div className="admin-menu-logo">
          <img src="/img/log.webp" alt="Solfecon" width="100"
            onError={(e) => { e.target.style.display = "none"; }} />
          <h2 className="titulo2">Portal Administrativo</h2>
        </div>
        <div className="admin-menu-botones">
          <Link to="/admin/lineas" className="admin-menu-btn">
            📦 Líneas de Producto
          </Link>
          <Link to="/admin/productos" className="admin-menu-btn">
            🔧 Productos
          </Link>
          <Link to="/admin/promociones" className="admin-menu-btn">
            🏷️ Promociones
          </Link>
          <Link to="/admin/clientes" className="admin-menu-btn">
            👥 Clientes
          </Link>
          <Link to="/admin/cotizaciones" className="admin-menu-btn">
            📄 Cotizaciones
          </Link>
          <button
            className="admin-menu-btn admin-menu-btn--danger"
            onClick={handleLogout}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
    </main>
  );
}