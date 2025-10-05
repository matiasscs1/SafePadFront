// viewmodels/cashbackViewModel.js
import { useState, useEffect } from "react";
import {
  obtenerCashbackUsuario,
  obtenerProductosCashback,
  reclamarCashback,
  obtenerHistorialCashback,
} from "../models/cashbackModels.js";

export const useCashbackViewModel = () => {
  // ===== ESTADOS GENERALES =====
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [reclamando, setReclamando] = useState(false);

  // ===== FUNCIONES DE CARGA =====

  const cargarCashbackUsuario = async () => {
    try {
      const response = await obtenerCashbackUsuario();
      
      if (response.success && response.data) {
        setDatosUsuario(response.data);
      } else {
        setDatosUsuario(null);
      }
    } catch (error) {
      console.error("Error al cargar cashback del usuario:", error);
      setDatosUsuario(null);
      throw error;
    }
  };

  const cargarProductosCashback = async () => {
    try {
      const response = await obtenerProductosCashback();
      
      if (response.success && response.data && response.data.length > 0) {
        setProductos(response.data);
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error("Error al cargar productos de cashback:", error);
      setProductos([]);
    }
  };

  const cargarHistorialCashback = async () => {
    try {
      const response = await obtenerHistorialCashback();
      
      if (response.success && response.data && response.data.length > 0) {
        setHistorial(response.data);
      } else {
        setHistorial([]);
      }
    } catch (error) {
      console.error("Error al cargar historial de cashback:", error);
      setHistorial([]);
    }
  };

  const reclamarProducto = async (id_producto) => {
    setReclamando(true);
    try {
      const response = await reclamarCashback(id_producto);
      
      if (response.success) {
        // Recargar datos después de reclamar
        await cargarDatosCompletos();
        return response;
      } else {
        throw new Error(response.message || 'Error al reclamar cashback');
      }
    } catch (error) {
      console.error("Error al reclamar cashback:", error);
      throw error;
    } finally {
      setReclamando(false);
    }
  };

  // ===== FUNCIONES AUXILIARES =====

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await cargarDatosCompletos();
    } catch (error) {
      console.error("Error al refrescar:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const cargarDatosCompletos = async () => {
    setLoading(true);
    try {
      await Promise.all([
        cargarCashbackUsuario(),
        cargarProductosCashback(),
        cargarHistorialCashback(),
      ]);
    } catch (error) {
      console.error("Error al cargar datos completos:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearMoneda = (cantidad) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0
    }).format(cantidad);
  };

  const puedeReclamar = (precio_producto) => {
    if (!datosUsuario || !datosUsuario.cashback) return false;
    return datosUsuario.cashback >= precio_producto;
  };

  const obtenerProductosPorCategoria = (categoria) => {
    if (!categoria) return productos;
    return productos.filter(producto => 
      producto.categoria && producto.categoria.toLowerCase() === categoria.toLowerCase()
    );
  };

  const obtenerCategorias = () => {
    const categorias = [...new Set(productos.map(p => p.categoria).filter(Boolean))];
    return categorias;
  };

  const obtenerHistorialReciente = (limite = 5) => {
    return historial.slice(0, limite);
  };

  const calcularTotalGastado = () => {
    return historial.reduce((total, item) => total + (item.costo || 0), 0);
  };

  // ===== EFECTOS =====
  
  useEffect(() => {
    cargarDatosCompletos();
  }, []);

  return {
    // ===== ESTADOS =====
    datosUsuario,
    productos,
    historial,
    loading,
    refreshing,
    reclamando,

    // ===== FUNCIONES =====
    cargarCashbackUsuario,
    cargarProductosCashback,
    cargarHistorialCashback,
    reclamarProducto,
    onRefresh,
    cargarDatosCompletos,
    formatearFecha,
    formatearMoneda,
    puedeReclamar,
    obtenerProductosPorCategoria,
    obtenerCategorias,
    obtenerHistorialReciente,
    calcularTotalGastado,
  };
};