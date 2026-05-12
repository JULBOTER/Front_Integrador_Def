import { useState } from "react";
import { Link } from "react-router-dom";
import { getLineasActivas, getPromocionesActivas } from "../data/productos";

export default function Home() {
  const [slideActual, setSlideActual] = useState(0);

  const lineasActivas = getLineasActivas();
  const promocionesActivas = getPromocionesActivas();

  const slides = [
    { img: "/img/linea_1.jpg", label: "1 - Pinturas y accesorios", ruta: "/categoria/1" },
    { img: "/img/linea_2.jpg", label: "2 - Construcción", ruta: "/categoria/2" },
    { img: "/img/linea_3.jpg", label: "3 - Plomería y gas", ruta: "/categoria/3" },
    { img: "/img/linea_4.jpg", label: "4 - Eléctricos", ruta: "/categoria/4" },
    { img: "/img/linea_5.jpg", label: "5 - Agropecuario", ruta: "/categoria/5" },
    { img: "/img/linea_6.jpg", label: "6 - Herramientas", ruta: "/categoria/6" },
    { img: "/img/linea_7.jpg", label: "7 - Seguridad Industrial", ruta: "/categoria/7" },
    { img: "/img/linea_8.jpg", label: "8 - Limpieza y accesorios", ruta: "/categoria/8" },
    { img: "/img/linea_9.jpg", label: "9 - Adhesivos y empaques", ruta: "/categoria/9" },
    { img: "/img/linea_10.webp", label: "10 - Tornillería", ruta: "/categoria/10" },
    { img: "/img/linea_11.webp", label: "11 - Abrasivos y químicos", ruta: "/categoria/11" },
    { img: "/img/linea_12.webp", label: "12 - Herrajes y cerrajería", ruta: "/categoria/12" },
  ];

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
          <button className="carousel-btn prev" onClick={anterior}>&#8249;</button>
          <div className="carousel-contenido">
            <img
              src={slides[slideActual].img}
              alt={slides[slideActual].label}
              className="carousel-img"
              onError={(e) => {
                e.target.src = "https://placehold.co/900x350?text=Línea+de+Producto";
              }}
            />
            <div className="carousel-caption">
              <Link to={slides[slideActual].ruta} className="enlace-carousel">
                {slides[slideActual].label}
              </Link>
            </div>
          </div>
          <button className="carousel-btn next" onClick={siguiente}>&#8250;</button>
        </div>
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

      {/* Tabla promociones */}
      <section className="section">
        <h2 className="titulo2">Promociones</h2>
        {promocionesActivas.length === 0 ? (
          <div className="crud-vacio-aviso">
            <p>No hay promociones disponibles en este momento.</p>
          </div>
        ) : (
          <div className="tabla-contenedor">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre de Promoción</th>
                  <th>Descuento</th>
                </tr>
              </thead>
              <tbody>
                {promocionesActivas.map((p) => (
                  <tr key={p.id}>
                    <td><Link to={p.ruta}>{p.nombre}</Link></td>
                    <td>{p.descuento}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Grid categorías */}
      <section className="section">
        <h2 className="titulo2">Explorar por categoría</h2>
        {lineasActivas.length === 0 ? (
          <div className="crud-vacio-aviso">
            <p>No hay líneas de producto disponibles en este momento.</p>
          </div>
        ) : (
          <div className="categorias-grid">
            {lineasActivas.map((cat) => (
              <Link key={cat.id} to={cat.ruta} className="categoria-card">
                {cat.nombre}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}