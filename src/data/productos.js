export const categorias = [
  { id: "pinturas", nombre: "1 - Pinturas y accesorios", ruta: "/categoria/pinturas" },
  { id: "construccion", nombre: "2 - Construcción", ruta: "/categoria/construccion" },
  { id: "plomeria", nombre: "3 - Plomería y gas", ruta: "/categoria/plomeria" },
  { id: "electricos", nombre: "4 - Eléctricos", ruta: "/categoria/electricos" },
  { id: "agropecuario", nombre: "5 - Agropecuario", ruta: "/categoria/agropecuario" },
  { id: "herramientas", nombre: "6 - Herramientas", ruta: "/categoria/herramientas" },
  { id: "seguridad", nombre: "7 - Seguridad Industrial", ruta: "/categoria/seguridad" },
  { id: "limpieza", nombre: "8 - Limpieza y accesorios", ruta: "/categoria/limpieza" },
  { id: "adhesivos", nombre: "9 - Adhesivos y empaques", ruta: "/categoria/adhesivos" },
  { id: "tornilleria", nombre: "10 - Tornillería y accesorios", ruta: "/categoria/tornilleria" },
  { id: "abrasivos", nombre: "11 - Abrasivos y químicos", ruta: "/categoria/abrasivos" },
  { id: "herrajes", nombre: "12 - Herrajes y cerrajería", ruta: "/categoria/herrajes" },
];

export const promociones = [
  { id: "navidad", nombre: "Navidad", descuento: 30, ruta: "/promocion/navidad" },
  { id: "saldos", nombre: "Saldos", descuento: 50, ruta: "/promocion/saldos" },
  { id: "seguridad", nombre: "Productos Seguridad", descuento: 10, ruta: "/promocion/seguridad" },
  { id: "sin_promocion", nombre: "Sin promoción", descuento: 0, ruta: "/promocion/sin_promocion" },
];

export function getLineasActivas() {
  try {
    const data = localStorage.getItem("Productos");
    if (!data) return [];
    const lineasAdmin = JSON.parse(data);
    if (!Array.isArray(lineasAdmin) || lineasAdmin.length === 0) return [];
    return lineasAdmin.map((l) => ({
      id: String(l.id),
      nombre: `${l.id} - ${l.descripcion}`,
      ruta: `/categoria/${l.id}`,
    }));
  } catch {
    return [];
  }
}

export function getPromocionesActivas() {
  try {
    const data = localStorage.getItem("Promociones");
    if (!data) return [];
    const promosAdmin = JSON.parse(data);
    if (!Array.isArray(promosAdmin) || promosAdmin.length === 0) return [];
    return promosAdmin.map((p) => ({
      id: String(p.id),
      nombre: `${p.id} - ${p.descripcion}`,
      descuento: Number(p.descuento) || 0,
      ruta: `/promocion/${p.id}`,
    }));
  } catch {
    return [];
  }
}

export function getProductosPorCategoria(categoriaId) {
  try {
    const data = localStorage.getItem("ProductosCRUD");
    if (!data) return [];
    const productosAdmin = JSON.parse(data);
    if (!Array.isArray(productosAdmin)) return [];
    return productosAdmin
      .filter((p) => String(p.linea) === String(categoriaId))
      .map((p) => ({
        id: p.id,
        nombre: p.descripcion,
        precio: p.precio,
        imagen: p.imagen || null,
        link: p.link || null,
        estado: p.estado,
      }));
  } catch {
    return [];
  }
}

export function getProductosPorPromocion(promocionId) {
  try {
    const data = localStorage.getItem("ProductosCRUD");
    if (!data) return [];
    const productosAdmin = JSON.parse(data);
    if (!Array.isArray(productosAdmin)) return [];
    return productosAdmin
      .filter((p) => String(p.promocion) === String(promocionId))
      .map((p) => ({
        id: p.id,
        nombre: p.descripcion,
        precio: p.precio,
        imagen: p.imagen || null,
        link: p.link || null,
        estado: p.estado,
      }));
  } catch {
    return [];
  }
}

export const formatPrecio = (precio) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precio);