import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login as loginApi,
  logout as logoutApi,
} from "../services/auth.api";

import { getProfile } from "../services/user.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================
  // GET USER PROFILE
  // ==========================

  const fetchProfile = async () => {

    try {

      const data = await getProfile();

      setUser(data.user);

    } catch (err) {

      setUser(null);

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // LOGIN
  // ==========================

  const login = async (userData) => {

    const data = await loginApi(userData);

    await fetchProfile();

    return data;

  };

  // ==========================
  // LOGOUT
  // ==========================

  const logout = async () => {

    await logoutApi();
    localStorage.removeItem("token");
    setUser(null);

  };

  // ==========================
  // FIRST LOAD
  // ==========================

  useEffect(() => {

    fetchProfile();

  }, []);

  return (

    <AuthContext.Provider

      value={{

        user,

        loading,

        login,

        logout,

        fetchProfile,

        isAuthenticated: !!user,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);