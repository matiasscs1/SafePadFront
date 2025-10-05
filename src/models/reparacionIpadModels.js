// models/reparacionIpadModels.js
import { getAuthToken } from "./tokenService";

const BASE_URL = "http://10.0.0.182:4003"; 

// === Obtener todos los iPads del usuario ===
export const obtenerIpadsPorUsuario = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/ipad/usuario`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await res.text();
      throw new Error("El servidor no devolvió JSON válido");
    }

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || `Error HTTP ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("Error en obtenerIpadsPorUsuario:", error);
    throw error;
  }
};

// === Obtener estados de reparación del usuario ===
export const obtenerEstadosReparacion = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/reparacion/estados`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await res.text();
      throw new Error("El servidor no devolvió JSON válido");
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Error HTTP ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("Error en obtenerEstadosReparacion:", error);
    throw error;
  }
};

// === Obtener técnico asignado por proceso ===
export const obtenerTecnicoPorProceso = async (id_proceso) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/reparacion/tecnico/${id_proceso}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await res.text();
      throw new Error("El servidor no devolvió JSON válido");
    }

    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || `Error HTTP ${res.status}`);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

// === Obtener piezas del proceso de reparación ===
export const obtenerPiezasProceso = async (id_ipad) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/reparacion/piezas/${id_ipad}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await res.text();
      throw new Error("El servidor no devolvió JSON válido");
    }

    const data = await res.json();

    
    
    
    return data;
  } catch (error) {
    throw error;
  }
};

// === Obtener fotos del daño ===
export const obtenerFotosDanio = async (id_proceso) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/reparacion/fotos/${id_proceso}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await res.text();
      throw new Error("El servidor no devolvió JSON válido");
    }

    const data = await res.json();
    
    
    
    return data;
  } catch (error) {
    throw error;
  }
};