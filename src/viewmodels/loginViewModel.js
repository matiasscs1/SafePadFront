import { useState } from "react";
import {
  registrarUsuario,
  loginUsuario,
  loginAdmin,
  cambiarContrasena,
  ingresarSerial,
  eliminarUsuario,
} from "../models/loginModels.js";

export const useUsuarioViewModel = () => {
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
      return await loginUsuario(correo, contrasena);
    } finally {
      setLoading(false);
    }
  };

  const loginAdminView = async () => {
    setLoading(true);
    try {
      return await loginAdmin(correo, contrasena);
    } finally {
      setLoading(false);
    }
  };

  const registrar = async (formData) => {
    setLoading(true);
    try {
      const data = await registrarUsuario(formData);
      setModalVisible(true);
      return data;
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
