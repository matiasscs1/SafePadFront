// viewmodels/loginViewModel.js
import { useState } from "react";
import {
  registrarUsuario,
  loginUsuario,
  loginAdmin,
  cambiarContrasena,
  ingresarSerial,
  eliminarUsuario,
} from "../models/loginModels.js";
import { useAuth } from '../context/AuthContext';

export const useUsuarioViewModel = () => {
  // Obtener funciones del AuthContext
  const { login: authLogin } = useAuth();

  // ===== ESTADOS GENERALES =====
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // ===== ESTADOS PARA CAMBIO DE CONTRASEÑA =====
  const [correoRecuperacion, setCorreoRecuperacion] = useState("");
  const [preguntaSeguridad, setPreguntaSeguridad] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [modalRecuperacionVisible, setModalRecuperacionVisible] = useState(false);

  // ===== FUNCIONES =====

  const login = async () => {
    setLoading(true);
    try {
      // Llamar al servicio de login
      const response = await loginUsuario(correo, contrasena);
      
      if (response.success) {
        // Usar el AuthContext para guardar los datos
        await authLogin(response.data.usuario, response.data.token);
        
        // Limpiar campos del formulario
        setCorreo('');
        setContrasena('');
        
        return response;
      } else {
        throw new Error(response.message || 'Error en el login');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginAdminView = async () => {
    setLoading(true);
    try {
      // Llamar al servicio de login admin
      const response = await loginAdmin(correo, contrasena);
      
      if (response.success) {
        // Usar el AuthContext para guardar los datos
        await authLogin(response.data.usuario, response.data.token);
        
        // Limpiar campos del formulario
        setCorreo('');
        setContrasena('');
        
        return response;
      } else {
        throw new Error(response.message || 'Error en el login de admin');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Registro - NO guarda token, solo registra
  const registrar = async (formData) => {
    setLoading(true);
    try {
      const data = await registrarUsuario(formData);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cambiarContrasenaView = async () => {
    setLoading(true);
    try {
      const data = await cambiarContrasena(
        correoRecuperacion,
        nuevaContrasena,
        preguntaSeguridad
      );
      setModalRecuperacionVisible(false);
      setCorreoRecuperacion("");
      setPreguntaSeguridad("");
      setNuevaContrasena("");
      return data;
    } finally {
      setLoading(false);
    }
  };

  const asignarSerial = async () => {
    setLoading(true);
    try {
      return await ingresarSerial(serial);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuarioView = async (id) => {
    setLoading(true);
    try {
      return await eliminarUsuario(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    // ===== ESTADOS =====
    correo,
    setCorreo,
    contrasena,
    setContrasena,
    serial,
    setSerial,
    loading,
    modalVisible,
    setModalVisible,
    correoRecuperacion,
    setCorreoRecuperacion,
    preguntaSeguridad,
    setPreguntaSeguridad,
    nuevaContrasena,
    setNuevaContrasena,
    modalRecuperacionVisible,
    setModalRecuperacionVisible,

    // ===== FUNCIONES =====
    login,
    loginAdminView,
    registrar,
    cambiarContrasenaView,
    asignarSerial,
    eliminarUsuarioView,
  };
};