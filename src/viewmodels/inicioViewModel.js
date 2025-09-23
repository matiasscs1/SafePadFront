// viewmodels/ipadViewModel.js
import { useState } from "react";
import {
  obtenerIpadsPorUsuario,
  obtenerIpadPorId,
  obtenerGarantiasPorUsuario,
} from "../models/inicioModels.js";

export const useIpadViewModel = () => {
  // ===== ESTADOS GENERALES =====
  const [loading, setLoading] = useState(false);
  const [ipads, setIpads] = useState([]);
  const [ipadSeleccionado, setIpadSeleccionado] = useState(null);
  const [garantias, setGarantias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGarantiasVisible, setModalGarantiasVisible] = useState(false);

  // ===== ESTADOS PARA FILTROS/BÚSQUEDA =====
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("todos"); // todos, activos, vencidos

  // ===== FUNCIONES =====

  const cargarIpadsPorUsuario = async () => {
    setLoading(true);
    try {
      const response = await obtenerIpadsPorUsuario();
      
      if (response && response.success) {
        setIpads(response.data || []);
        return response;
      } else {
        // Si la respuesta no tiene el formato esperado, loguear para debug
        throw new Error(response?.message || 'Error al cargar iPads');
      }
    } catch (error) {
      console.error("Error en cargarIpadsPorUsuario:", error);
      // Establecer array vacío en caso de error
      setIpads([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cargarIpadPorId = async (id_ipad) => {
    setLoading(true);
    try {
      const response = await obtenerIpadPorId(id_ipad);
      
      if (response.success) {
        setIpadSeleccionado(response.data);
        return response;
      } else {
        throw new Error(response.message || 'Error al cargar iPad');
      }
    } catch (error) {
      console.error("Error en cargarIpadPorId:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cargarGarantiasPorUsuario = async (id_ipad) => {
    setLoading(true);
    try {
      const response = await obtenerGarantiasPorUsuario(id_ipad);
      
      if (response.success) {
        setGarantias(response.data);
        return response;
      } else {
        throw new Error(response.message || 'Error al cargar garantías');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ===== FUNCIONES DE UI =====
  const seleccionarIpad = (ipad) => {
    setIpadSeleccionado(ipad);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setIpadSeleccionado(null);
  };

  const abrirModalGarantias = async (ipad) => {
    setIpadSeleccionado(ipad);
    setModalGarantiasVisible(true);
    // Cargar garantías automáticamente al abrir el modal
    try {
      await cargarGarantiasPorUsuario(ipad._id);
    } catch (error) {
      console.error("Error al cargar garantías:", error);
    }
  };

  const cerrarModalGarantias = () => {
    setModalGarantiasVisible(false);
    setIpadSeleccionado(null);
    setGarantias([]);
  };

  // ===== FUNCIONES DE FILTRADO =====
  const filtrarIpads = () => {
    let ipadsFiltrados = [...ipads];

    // Filtrar por búsqueda
    if (busqueda.trim()) {
      ipadsFiltrados = ipadsFiltrados.filter(ipad => 
        (ipad.nombre && ipad.nombre.toLowerCase().includes(busqueda.toLowerCase())) ||
        (ipad.modelo && ipad.modelo.toLowerCase().includes(busqueda.toLowerCase())) ||
        (ipad.serial && ipad.serial.toLowerCase().includes(busqueda.toLowerCase()))
      );
    }

    // Filtrar por estado (si tienes un campo de estado en tus iPads)
    if (filtroActivo !== "todos") {
      ipadsFiltrados = ipadsFiltrados.filter(ipad => {
        if (filtroActivo === "activos") {
          return ipad.estado === "activo" || !ipad.estado; // asumir activo si no hay estado
        } else if (filtroActivo === "inactivos") {
          return ipad.estado === "inactivo";
        }
        return true;
      });
    }

    return ipadsFiltrados;
  };

  // ===== FUNCIONES DE UTILIDAD =====
  const limpiarFormulario = () => {
    setBusqueda("");
    setFiltroActivo("todos");
    setIpadSeleccionado(null);
    setGarantias([]);
  };

  const refrescarDatos = async () => {
    try {
      await cargarIpadsPorUsuario();
    } catch (error) {
      console.error("Error al refrescar datos:", error);
    }
  };

  return {
    // ===== ESTADOS =====
    loading,
    ipads,
    ipadSeleccionado,
    garantias,
    modalVisible,
    setModalVisible,
    modalGarantiasVisible,
    setModalGarantiasVisible,
    busqueda,
    setBusqueda,
    filtroActivo,
    setFiltroActivo,

    // ===== FUNCIONES DE DATOS =====
    cargarIpadsPorUsuario,
    cargarIpadPorId,
    cargarGarantiasPorUsuario,

    // ===== FUNCIONES DE UI =====
    seleccionarIpad,
    cerrarModal,
    abrirModalGarantias,
    cerrarModalGarantias,

    // ===== FUNCIONES DE FILTRADO =====
    filtrarIpads,

    // ===== FUNCIONES DE UTILIDAD =====
    limpiarFormulario,
    refrescarDatos,
  };
};