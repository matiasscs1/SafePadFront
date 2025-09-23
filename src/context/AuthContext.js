// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error cargando datos almacenados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para login normal
  const login = async (usuario, jwtToken) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(usuario));
      await AsyncStorage.setItem('token', jwtToken);
      setUser(usuario);
      setToken(jwtToken);
    } catch (error) {
      console.error('Error guardando datos de login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'token']);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  // Función para verificar si está autenticado
  const isAuthenticated = () => {
    return !!(user && token);
  };

  // Función para obtener el token para las requests
  const getToken = () => {
    return token;
  };

  // Función para actualizar datos del usuario
  const updateUser = async (newUserData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUserData));
      setUser(newUserData);
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    getToken,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};