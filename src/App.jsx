import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RutaProtegida from "./components/RutaProtegida";
import RutaAdmin from "./components/RutaAdmin";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Cotizacion from "./pages/Cotizacion";
import CategoriaPage from "./pages/categorias/CategoriaPage";
import PromocionPage from "./pages/promociones/PromocionPage";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminLineas from "./pages/admin/AdminLineas";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminPromociones from "./pages/admin/AdminPromociones";
import AdminClientes from "./pages/admin/AdminClientes";
import AdminCotizaciones from "./pages/admin/AdminCotizaciones";

export default function App() {
  return (
    <AdminProvider>
      <AuthProvider>
        <CarritoProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* Páginas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              {/* Categorías */}
              <Route path="/categoria/:id" element={<CategoriaPage />} />

              {/* Promociones */}
              <Route path="/promocion/:id" element={<PromocionPage />} />

              {/* Carrito — protegido */}
              <Route path="/carrito" element={
                <RutaProtegida><Carrito /></RutaProtegida>
              } />

              {/* Cotización — protegido */}
              <Route path="/cotizacion" element={
                <RutaProtegida><Cotizacion /></RutaProtegida>
              } />

              {/* Admin — login público */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin — rutas protegidas */}
              <Route path="/admin/menu" element={
                <RutaAdmin><AdminMenu /></RutaAdmin>
              } />
              <Route path="/admin/lineas" element={
                <RutaAdmin><AdminLineas /></RutaAdmin>
              } />
              <Route path="/admin/productos" element={
                <RutaAdmin><AdminProductos /></RutaAdmin>
              } />
              <Route path="/admin/promociones" element={
                <RutaAdmin><AdminPromociones /></RutaAdmin>
              } />
              <Route path="/admin/clientes" element={
                <RutaAdmin><AdminClientes /></RutaAdmin>
              } />
              <Route path="/admin/cotizaciones" element={
                <RutaAdmin><AdminCotizaciones /></RutaAdmin>
              } />

              {/* 404 */}
              <Route path="*" element={
                <main className="main">
                  <h2 className="titulo2">Página no encontrada</h2>
                  <p style={{ textAlign: "center" }}>
                    <a href="/" style={{ color: "#d32f2f" }}>Volver al inicio</a>
                  </p>
                </main>
              } />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CarritoProvider>
      </AuthProvider>
    </AdminProvider>
  );
}