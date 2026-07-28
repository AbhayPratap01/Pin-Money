import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("pinmoney_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("pinmoney_token"));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("pinmoney_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("pinmoney_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("pinmoney_token", token);
    } else {
      localStorage.removeItem("pinmoney_token");
    }
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const result = await loginUser(credentials);
      setUser(result.user);
      setToken(result.token);
      toast.success("Logged in successfully");
      navigate("/dashboard");
      return result;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Unable to login");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const result = await registerUser(payload);
      setUser(result.user);
      setToken(result.token);
      toast.success("Account created! Let's set up your loan profile.");
      navigate("/products?onboarding=true");
      return result;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Unable to register");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    toast.info("Logged out successfully");
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
