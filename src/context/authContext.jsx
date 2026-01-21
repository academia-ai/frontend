/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../lib/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsAuthenticated(false)
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const userProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return { success: false, error: "No authentication token found" };
      }

      const response = await axios.get(`${API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      
      
      if (error.response) {
        if (error.response.status === 401) {
        
          setUser(null);
          setIsAuthenticated(false);
          return { success: false, error: "Session expired. Please login again." };
        }
        return { success: false, error: error.response.data.message || "Failed to fetch profile" };
      } else if (error.request) {
        return { success: false, error: "Network error. Please check your connection." };
      } else {
        return { success: false, error: "An unexpected error occurred." };
      }
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    console.log('API_URL:', API_URL)
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.data.success) {
        
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        
        setUser(response.data.user);
        setIsAuthenticated(true);
        setLoading(false);
        return { success: true, user: response.data.user };
      } else {
        setLoading(false);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      
      if (error.response) {
        return { success: false, error: error.response.data.message || "Login failed" };
      } else if (error.request) {
        return { success: false, error: "Network error. Please check your connection." };
      } else {
        return { success: false, error: "An unexpected error occurred." };
      }
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
      }, {
        withCredentials: true,
      });

      if (response.data.success) {
    
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        
        setUser(response.data.user);
        setIsAuthenticated(true);
        setLoading(false);
        return { success: true, user: response.data.user };
      } else {
        setLoading(false);
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration failed:", error);
      
      if (error.response) {
        
        const errorMessage = error.response.data.message || "Registration failed";
        return { success: false, error: errorMessage };
      } else if (error.request) {
        return { success: false, error: "Network error. Please check your connection." };
      } else {
        return { success: false, error: "An unexpected error occurred." };
      }
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint if needed
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {

      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const values = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    userProfile,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};