import { createContext, useContext, useState } from "react";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [adminActivo, setAdminActivo] = useState(() => {
    return localStorage.getItem("solfecon_admin") === "true";
  });

  const loginAdmin = (usuario, password) => {
    if (usuario === "admin" && password === "1234") {
      localStorage.setItem("solfecon_admin", "true");
      setAdminActivo(true);
      return { exito: true };
    }
    return { exito: false, error: "Usuario o contraseña incorrectos" };
  };

  const logoutAdmin = () => {
    localStorage.removeItem("solfecon_admin");
    setAdminActivo(false);
  };

  return (
    <AdminContext.Provider value={{ adminActivo, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}