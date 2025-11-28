// src/pages/useAuth.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { apiUtilisateur } from "../api";
import jwtDecode from "jwt-decode"; // ✅ import correct pour Vite

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Initialiser user depuis le token si existant
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });

  // 🔄 Rafraîchissement automatique du token toutes les 5 minutes
  useEffect(() => {
    const refreshToken = async () => {
      const refresh = localStorage.getItem("refreshToken");
      if (!refresh) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      // Si le token expire dans moins d'une minute, on le rafraîchit
      if (decoded.exp - now < 60) {
        try {
          const res = await apiUtilisateur.post("/token/refresh/", { refresh });
          localStorage.setItem("token", res.data.access);
          setUser(jwtDecode(res.data.access));
        } catch (err) {
          console.error("Token expiré, déconnexion...");
          localStorage.clear();
          window.location.href = "/SignIn";
        }
      } else {
        setUser(decoded);
      }
    };

    // Appel immédiat + intervalle
    refreshToken();
    const interval = setInterval(refreshToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Login avec stockage du token et décodage
  const login = async (credentials) => {
    try {
      const res = await apiUtilisateur.post("/token/", credentials);
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      setUser(jwtDecode(res.data.access));
    } catch (err) {
      console.error("Erreur login :", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Déconnexion
  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/SignIn";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook pour consommer le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
