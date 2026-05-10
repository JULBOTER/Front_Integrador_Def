import { useState } from "react";
import { Link } from "react-router-dom";
import { categorias, promociones } from "../data/productos";

const slides = [
  { img: "/img/linea_1.jpg", label: "1 - Pinturas y accesorios", ruta: "/categoria/pinturas" },
  { img: "/img/linea_2.jpg", label: "2 - Construcción", ruta: "/categoria/construccion" },
  { img: "/img/linea_3.jpg", label: "3 - Plomería y gas", ruta: "/categoria/plomeria" },
  { img: "/img/linea_4.jpg", label: "4 - Eléctricos", ruta: "/categoria/electricos" },
  { img: "/img/linea_5.jpg", label: "5 - Agropecuario", ruta: "/categoria/agropecuario" },
  { img: "/img/linea_6.jpg", label: "6 - Herramientas", ruta: "/categoria/herramientas" },
  { img: "/img/linea_7.jpg", label: "7 - Seguridad Industrial", ruta: "/categoria/seguridad" },
  { img: "/img/linea_8.jpg", label: "8 - Limpieza y accesorios", ruta: "/categoria/limpieza" },
  { img: "/img/linea_9.jpg", label: "9 - Adhesivos y empaques", ruta: "/categoria/adhesivos" },
  { img: "/img/linea_10.webp", label: "10 - Tornillería", ruta: "/categoria/tornilleria" },
  { img: "/img/linea_11.webp", label: "11 - Abrasivos y químicos", ruta: "/categoria/abrasivos" },
  { img: "/img/linea_12.webp", label: "12 - Herrajes y cerrajería", ruta: "/categoria/herrajes" },
];

export default function Home() {
  const [slideActual, setSlideActual] = useState(0);

  const anterior = () =>
    setSlideActual((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const siguiente = () =>
    setSlideActual((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <main className="main">

      {/* ¿Quiénes somos? */}
      <section className="quienes-somos">
        <h2 className="titulo2">¿Quiénes somos?</h2>
        <p>
          <strong>Somos su distribuidor mayorista</strong> de productos para el
          sector de ferretería y materiales de construcción.
        </p>
        <p>
          Con <strong>más de 10 años de experiencia</strong> en el sector
          ferretero y de construcción, en <strong>SOLFECON</strong> reunimos
          experiencia, confianza y amistad para ayudar a nuestros clientes a
          alcanzar el éxito.
        </p>
        <p>
          En <strong>SOLFECON</strong>, garantizamos{" "}
          <em>alianzas estratégicas</em> con proveedores nacionales y
          extranjeros, asegurando productos de la más alta calidad.
        </p>
      </section>

      {/* Carrusel */}
      <section className="section">
        <h2 className="titulo2">Nuestras líneas de producto</h2>
        <div className="carousel">
          <button className="carousel-btn prev" onClick={anterior}>
            &#8249;
          </button>
          <div className="carousel-contenido">
            <img
              src={slides[slideActual].img}
              alt={slides[slideActual].label}
              className="carousel-img"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/900x350?text=Línea+de+Producto";
              }}
            />
            <div className="carousel-caption">
              <Link to={slides[slideActual].ruta} className="enlace-carousel">
                {slides[slideActual].label}
              </Link>
            </div>
          </div>
          <button className="carousel-btn next" onClick={siguiente}>
            &#8250;
          </button>
        </div>

        {/* Indicadores */}
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === slideActual ? "activo" : ""}`}
              onClick={() => setSlideActual(i)}
            />
          ))}
        </div>
      </section>

      {/* Tabla de promociones */}
      <section className="section">
        <h2 className="titulo2">Promociones</h2>
        <div className="tabla-contenedor">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre de Promoción</th>
                <th>Descuento</th>
                <th>Fecha inicio</th>
                <th>Fecha fin</th>
              </tr>
            </thead>
            <tbody>
              {promociones.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link to={p.ruta}>{p.nombre}</Link>
                  </td>
                  <td>{p.descuento}%</td>
                  <td>{p.fechaInicio}</td>
                  <td>{p.fechaFin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grid de categorías */}
      <section className="section">
        <h2 className="titulo2">Explorar por categoría</h2>
        <div className="categorias-grid">
          {categorias.map((cat) => (
            <Link key={cat.id} to={cat.ruta} className="categoria-card">
              {cat.nombre}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}