// viewmodels/miIpadViewModel.js
import { useState, useEffect } from "react";
import {
  obtenerIpadsPorUsuario,
  renovarGarantiaSafePad,
  obtenerEstadosReparacion,
  obtenerTecnicoPorProceso,
  obtenerGarantiasPorUsuario,
} from "../models/miIpadModels.js";

export const useMiIpadViewModel = () => {
  // ===== ESTADOS GENERALES =====
  const [ipads, setIpads] = useState([]);
  const [estadosReparacion, setEstadosReparacion] = useState([]);
  const [garantiasReales, setGarantiasReales] = useState([]);
  const [tecnicoAsignado, setTecnicoAsignado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ===== ESTADOS ESPECÍFICOS =====
  const [ipadSeleccionado, setIpadSeleccionado] = useState(null);
  const [procesoReparacionActual, setProcesoReparacionActual] = useState(null);

  // ===== FUNCIONES =====

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

  const cargarGarantiasReales = async (id_ipad) => {
    try {
      const response = await obtenerGarantiasPorUsuario(id_ipad);
      
      if (response.success && response.data && response.data.length > 0) {
        setGarantiasReales(response.data);
      } else {
        setGarantiasReales([]);
      }
    } catch (error) {
      console.error("Error al cargar garantías reales:", error);
      setGarantiasReales([]);
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
            proceso => proceso.id_ipad && proceso.id_ipad._id === ipadSeleccionado._id
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

  const renovarGarantia = async (id_garantia, fecha_inicio, fecha_vencimiento) => {
    setLoading(true);
    try {
      const response = await renovarGarantiaSafePad(id_garantia, fecha_inicio, fecha_vencimiento);
      
      if (response.success) {
        // Recargar datos después de la renovación
        await cargarDatosCompletos();
        return response;
      } else {
        throw new Error(response.message || 'Error al renovar garantía');
      }
    } catch (error) {
      console.error("Error al renovar garantía:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const seleccionarIpad = async (ipad) => {
    setIpadSeleccionado(ipad);
    // Recargar datos cuando se selecciona un iPad diferente
    await cargarEstadosReparacion();
    await cargarGarantiasReales(ipad._id);
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
      const ipadParaGarantias = ipadSeleccionado || ipads[0];
      if (ipadParaGarantias) {
        await cargarGarantiasReales(ipadParaGarantias._id);
      }
    }
  };

  // ===== EFECTOS =====
  
  useEffect(() => {
    cargarDatosCompletos();
  }, []);

  // Cargar técnico cuando hay un proceso activo
  useEffect(() => {
    if (procesoReparacionActual && procesoReparacionActual._id) {
      cargarTecnicoAsignado(procesoReparacionActual._id);
    } else {
      setTecnicoAsignado(null);
    }
  }, [procesoReparacionActual]);

  // Cargar estados cuando cambia el iPad seleccionado
  useEffect(() => {
    if (ipadSeleccionado) {
      cargarEstadosReparacion();
      cargarGarantiasReales(ipadSeleccionado._id);
    }
  }, [ipadSeleccionado]);

  // ===== FUNCIONES AUXILIARES =====

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
    
    // Extraer los pasos del proceso de reparación
    const pasos = procesoReparacionActual.pasos || [];
    
    // Buscar estados específicos en los pasos
    const dispositivoRecibido = pasos.find(paso => 
      paso.titulo && paso.titulo.toLowerCase().includes('dispositivo recibido')
    );
    const fotografiaIngreso = pasos.find(paso => 
      paso.titulo && paso.titulo.toLowerCase().includes('fotografía') || 
      paso.titulo && paso.titulo.toLowerCase().includes('fotografia')
    );
    const pruebasDiagnostico = pasos.find(paso => 
      paso.titulo && paso.titulo.toLowerCase().includes('diagnóstico') ||
      paso.titulo && paso.titulo.toLowerCase().includes('diagnostico') ||
      paso.titulo && paso.titulo.toLowerCase().includes('pruebas')
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

  const obtenerGarantiaApple = () => {
    if (!garantiasReales || garantiasReales.length === 0) {
      // Fallback: simular datos si no hay garantías reales
      if (!ipadSeleccionado) return null;
      
      const fechaCompra = new Date(ipadSeleccionado.fecha_compra || Date.now());
      const fechaVencimiento = new Date(fechaCompra);
      fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
      
      const ahora = new Date();
      const activa = ahora < fechaVencimiento;
      
      return {
        vence: formatearFecha(fechaVencimiento),
        cobertura: "Limitada + Soporte Técn.",
        activa: activa
      };
    }

    // Buscar garantía Apple en las garantías reales
    const garantiaApple = garantiasReales.find(g => 
      g.tipo_garantia && g.tipo_garantia.toLowerCase().includes('apple')
    );

    if (!garantiaApple) return null;

    const ahora = new Date();
    const fechaVencimiento = new Date(garantiaApple.fecha_vencimiento);
    const activa = ahora < fechaVencimiento && garantiaApple.estado === 'activa';

    return {
      vence: formatearFecha(garantiaApple.fecha_vencimiento),
      cobertura: garantiaApple.cobertura || "Limitada + Soporte Técn.",
      activa: activa
    };
  };

  const obtenerGarantiaSafePad = () => {
    if (!garantiasReales || garantiasReales.length === 0) {
      // Fallback: simular datos si no hay garantías reales
      if (!ipadSeleccionado) return null;
      
      const fechaCompra = new Date(ipadSeleccionado.fecha_compra || Date.now());
      const fechaRenovacion = new Date(fechaCompra);
      fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 6);
      
      const ahora = new Date();
      const diasRestantes = Math.ceil((fechaRenovacion - ahora) / (1000 * 60 * 60 * 24));
      const proximaVencer = diasRestantes <= 30 && diasRestantes > 0;
      
      return {
        id: `garantia_safepad_${ipadSeleccionado._id}`,
        renovacion: formatearFecha(fechaRenovacion),
        plan: "SafePad Plus (daños accidentales)",
        proximaVencer: proximaVencer,
        diasRestantes: Math.max(0, diasRestantes)
      };
    }

    // Buscar garantía SafePad en las garantías reales
    const garantiaSafePad = garantiasReales.find(g => 
      g.tipo_garantia && g.tipo_garantia.toLowerCase().includes('safepad')
    );

    if (!garantiaSafePad) return null;

    const ahora = new Date();
    const fechaVencimiento = new Date(garantiaSafePad.fecha_vencimiento);
    const diasRestantes = Math.ceil((fechaVencimiento - ahora) / (1000 * 60 * 60 * 24));
    const proximaVencer = diasRestantes <= 30 && diasRestantes > 0;

    return {
      id: garantiaSafePad._id,
      renovacion: formatearFecha(garantiaSafePad.fecha_vencimiento),
      plan: garantiaSafePad.plan || "SafePad Plus (daños accidentales)",
      proximaVencer: proximaVencer,
      diasRestantes: Math.max(0, diasRestantes)
    };
  };

  return {
    // ===== ESTADOS =====
    ipads,
    estadosReparacion,
    garantiasReales,
    tecnicoAsignado,
    loading,
    refreshing,
    ipadSeleccionado,
    procesoReparacionActual,

    // ===== FUNCIONES =====
    cargarIpadsUsuario,
    cargarEstadosReparacion,
    cargarGarantiasReales,
    cargarTecnicoAsignado,
    renovarGarantia,
    seleccionarIpad,
    onRefresh,
    cargarDatosCompletos,
    formatearFecha,
    obtenerEstadoProceso,
    obtenerGarantiaApple,
    obtenerGarantiaSafePad,

    // ===== SETTERS =====
    setIpadSeleccionado,
  };
};