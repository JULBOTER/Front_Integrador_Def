// =============================================
// CATEGORÍAS Y PROMOCIONES — SIEMPRE FIJAS
// =============================================

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
  { id: "navidad", nombre: "Navidad", descuento: 30, ruta: "/promocion/navidad", fechaInicio: "1 dic 2025", fechaFin: "6 ene 2026" },
  { id: "saldos", nombre: "Saldos", descuento: 50, ruta: "/promocion/saldos", fechaInicio: "30 jun 2025", fechaFin: "6 ene 2026" },
  { id: "seguridad", nombre: "Productos Seguridad", descuento: 10, ruta: "/promocion/seguridad", fechaInicio: "15 jun 2025", fechaFin: "6 jul 2025" },
  { id: "sin_promocion", nombre: "Sin promoción", descuento: 0, ruta: "/promocion/sin_promocion", fechaInicio: "1 ene 2025", fechaFin: "31 dic 2025" },
];

// =============================================
// FUNCIONES PARA OBTENER PRODUCTOS DEL CRUD
// =============================================

export function getProductosPorCategoria(categoriaId) {
  try {
    const productosAdmin = JSON.parse(localStorage.getItem("ProductosCRUD")) || [];
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
    const productosAdmin = JSON.parse(localStorage.getItem("ProductosCRUD")) || [];
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

// =============================================
// UTILIDADES
// =============================================

export const formatPrecio = (precio) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(precio);