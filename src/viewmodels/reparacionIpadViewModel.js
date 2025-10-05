// viewmodels/reparacionIpadViewModel.js
import { useState, useEffect } from "react";
import {
  obtenerIpadsPorUsuario,
  obtenerEstadosReparacion,
  obtenerTecnicoPorProceso,
  obtenerPiezasProceso,
  obtenerFotosDanio,
} from "../models/reparacionIpadModels.js";

export const useReparacionIpadViewModel = () => {
  // ===== ESTADOS GENERALES =====
  const [ipads, setIpads] = useState([]);
  const [estadosReparacion, setEstadosReparacion] = useState([]);
  const [tecnicoAsignado, setTecnicoAsignado] = useState(null);
  const [piezasProceso, setPiezasProceso] = useState([]);
  const [fotosDanio, setFotosDanio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ===== ESTADOS ESPECÍFICOS =====
  const [ipadSeleccionado, setIpadSeleccionado] = useState(null);
  const [procesoReparacionActual, setProcesoReparacionActual] = useState(null);

  // ===== FUNCIONES DE CARGA =====

  const cargarIpadsUsuario = async () => {
    setLoading(true);
    try {
      const response = await obtenerIpadsPorUsuario();
      
      if (response.success && response.data && response.data.length > 0) {
        setIpads(response.data);
        // Seleccionar el primer iPad por defecto
        setIpadSeleccionado(response.data[0]);
      } else {
        setIpads([]);
        setIpadSeleccionado(null);
      }
    } catch (error) {
      console.error("Error al cargar iPads:", error);
      setIpads([]);
      setIpadSeleccionado(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadosReparacion = async () => {
    try {
      const response = await obtenerEstadosReparacion();
      
      if (response.success && response.data && response.data.length > 0) {
        setEstadosReparacion(response.data);
        
        // Buscar proceso activo del iPad seleccionado
        if (ipadSeleccionado) {
          const procesoActual = response.data.find(
            proceso => {
              // Comparar por diferentes posibles estructuras
              const procesoIpadId = proceso.id_ipad?._id || proceso.id_ipad;
              return procesoIpadId === ipadSeleccionado._id;
            }
          );
          
          setProcesoReparacionActual(procesoActual || null);
        }
      } else {
        setEstadosReparacion([]);
        setProcesoReparacionActual(null);
      }
    } catch (error) {
      console.error("Error al cargar estados de reparación:", error);
      setEstadosReparacion([]);
      setProcesoReparacionActual(null);
    }
  };

  const cargarTecnicoAsignado = async (id_proceso) => {
    try {
      const response = await obtenerTecnicoPorProceso(id_proceso);
      
      if (response.success && response.tecnicos_asignados && response.tecnicos_asignados.length > 0) {
        setTecnicoAsignado(response.tecnicos_asignados[0]);
      } else {
        setTecnicoAsignado(null);
      }
    } catch (error) {
      console.error("Error al cargar técnico asignado:", error);
      setTecnicoAsignado(null);
    }
  };

  const cargarPiezasProceso = async (id_ipad) => {
    try {
      const response = await obtenerPiezasProceso(id_ipad);
      
      if (response.success && response.piezas && response.piezas.length > 0) {
        setPiezasProceso(response.piezas);
      } else {
        setPiezasProceso([]);
      }
    } catch (error) {
      console.error("Error al cargar piezas del proceso:", error);
      setPiezasProceso([]);
    }
  };

  const cargarFotosDanio = async (id_proceso) => {
    try {
      const response = await obtenerFotosDanio(id_proceso);
      
      if (response.success && response.fotos && response.fotos.length > 0) {
        setFotosDanio(response.fotos);
      } else {
        setFotosDanio([]);
      }
    } catch (error) {
      console.error("Error al cargar fotos del daño:", error);
      setFotosDanio([]);
    }
  };

  // ===== FUNCIONES AUXILIARES =====

  const seleccionarIpad = async (ipad) => {
    setIpadSeleccionado(ipad);
    // Limpiar datos anteriores
    setProcesoReparacionActual(null);
    setTecnicoAsignado(null);
    setPiezasProceso([]);
    setFotosDanio([]);
    
    // Recargar datos cuando se selecciona un iPad diferente
    await cargarEstadosReparacion();
    await cargarPiezasProceso(ipad._id);
  };

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
    await cargarIpadsUsuario();
    if (ipadSeleccionado || (ipads && ipads.length > 0)) {
      await cargarEstadosReparacion();
      const ipadParaDatos = ipadSeleccionado || ipads[0];
      if (ipadParaDatos) {
        await cargarPiezasProceso(ipadParaDatos._id);
      }
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

  const obtenerEstadoProceso = () => {
    if (!procesoReparacionActual) return null;
    
    const pasos = procesoReparacionActual.pasos || [];
    
    const dispositivoRecibido = pasos.find(paso => 
      paso.titulo && paso.titulo.toLowerCase().includes('dispositivo recibido')
    );
    const fotografiaIngreso = pasos.find(paso => 
      paso.titulo && (paso.titulo.toLowerCase().includes('fotografía') || 
      paso.titulo.toLowerCase().includes('fotografia'))
    );
    const pruebasDiagnostico = pasos.find(paso => 
      paso.titulo && (paso.titulo.toLowerCase().includes('diagnóstico') ||
      paso.titulo.toLowerCase().includes('diagnostico') ||
      paso.titulo.toLowerCase().includes('pruebas'))
    );
    
    return {
      dispositivo_recibido: dispositivoRecibido ? dispositivoRecibido.estado === 'completado' : false,
      fotografia_ingreso: fotografiaIngreso ? fotografiaIngreso.estado === 'completado' : false,
      pruebas_diagnostico: pruebasDiagnostico ? pruebasDiagnostico.estado === 'completado' : false,
      fecha_entrega_estimada: procesoReparacionActual.fecha_entrega_estimada || null,
      notas: procesoReparacionActual.problema_inicial || procesoReparacionActual.notas || "",
      pasos_completos: pasos,
      estado_general: procesoReparacionActual.estado_general || "en_proceso"
    };
  };

  const obtenerProgresoReparacion = () => {
    if (!procesoReparacionActual) return 0;
    
    const pasos = procesoReparacionActual.pasos || [];
    if (pasos.length === 0) return 0;
    
    const pasosCompletados = pasos.filter(paso => paso.estado === 'completado').length;
    return Math.round((pasosCompletados / pasos.length) * 100);
  };

  const obtenerPiezasPendientes = () => {
    return piezasProceso.filter(pieza => 
      pieza.estado && pieza.estado.toLowerCase() === 'pendiente'
    );
  };

  const obtenerPiezasCompletadas = () => {
    return piezasProceso.filter(pieza => 
      pieza.estado && pieza.estado.toLowerCase() === 'completada'
    );
  };

  // ===== EFECTOS =====
  
  useEffect(() => {
    cargarDatosCompletos();
  }, []);

  // Cargar técnico y fotos cuando hay un proceso activo
  useEffect(() => {
    if (procesoReparacionActual && procesoReparacionActual._id) {
      cargarTecnicoAsignado(procesoReparacionActual._id);
      cargarFotosDanio(procesoReparacionActual._id);
    } else {
      setTecnicoAsignado(null);
      setFotosDanio([]);
    }
  }, [procesoReparacionActual]);

  // Cargar estados y piezas cuando cambia el iPad seleccionado
  useEffect(() => {
    if (ipadSeleccionado) {
      const cargarDatosIpad = async () => {
        await cargarEstadosReparacion();
        await cargarPiezasProceso(ipadSeleccionado._id);
      };
      cargarDatosIpad();
    }
  }, [ipadSeleccionado]);

  return {
    // ===== ESTADOS =====
    ipads,
    estadosReparacion,
    tecnicoAsignado,
    piezasProceso,
    fotosDanio,
    loading,
    refreshing,
    ipadSeleccionado,
    procesoReparacionActual,

    // ===== FUNCIONES =====
    cargarIpadsUsuario,
    cargarEstadosReparacion,
    cargarTecnicoAsignado,
    cargarPiezasProceso,
    cargarFotosDanio,
    seleccionarIpad,
    onRefresh,
    cargarDatosCompletos,
    formatearFecha,
    obtenerEstadoProceso,
    obtenerProgresoReparacion,
    obtenerPiezasPendientes,
    obtenerPiezasCompletadas,

    // ===== SETTERS =====
    setIpadSeleccionado,
  };
};