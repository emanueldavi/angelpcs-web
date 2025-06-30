import { getMe } from "@/api/login";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // exp está en segundos desde epoch
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  // Verifica expiración al cargar el contexto o cuando cambia el token
  useEffect( () => {
    if (token && isTokenExpired(token)) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("adminToken");
    }
    const updateUser = async ()=> {
      const res = await getMe(token)
      if (res['error'] == 'Admin no encontrado') {
        logout();
        
      };
      setUser(res);
    }

    updateUser();
    

  }, [token]);

  const login = async (userData, token) => {
    setToken(token);
    localStorage.setItem("adminToken", token);
    const res = await getMe(token)
    const user = await res.json();
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("adminToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
