import { createContext, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await API.get("/users", { params: { email, password } });
      const data = res.data;
      if (data.length === 0) {
        toast.error("Credenciais inválidas.");
        setLoading(false);
        return null;
      }
      const found = data[0];
      const token = btoa(`${found.email}:${Date.now()}`);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(found));
      setUser(found);
      toast.success("Login efetuado com sucesso.");
      setLoading(false);
      return found;
    } catch (err) {
      toast.error("Erro no login.");
      setLoading(false);
      throw err;
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const existing = await API.get("/users", { params: { email } });
      if (existing.data.length > 0) {
        toast.error("E-mail já cadastrado.");
        setLoading(false);
        return null;
      }

      const res = await API.post("/users", {
        name,
        email,
        password,
        role: "user",
      });
      toast.success("Cadastro efetuado com sucesso.");
      setLoading(false);
      return res.data;
    } catch (err) {
      toast.error("Erro ao cadastrar usuário. Verifique os dados.");
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Desconectado.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
