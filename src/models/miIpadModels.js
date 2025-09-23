// models/miIpadModels.js
import { getAuthToken } from "./tokenService";

const BASE_URL = "http://10.0.0.165:4003"; 

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

    // Verificar si la respuesta es JSON
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

// === Renovar garantía SafePad ===
export const renovarGarantiaSafePad = async (id_garantia, fecha_inicio, fecha_vencimiento) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/garantia/renovar/${id_garantia}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fecha_inicio,
        fecha_vencimiento
      })
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
    console.error("Error en renovarGarantiaSafePad:", error);
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

export const obtenerGarantiasPorUsuario = async (id_ipad) => {
  const token = await getAuthToken();
  const res = await fetch(`${BASE_URL}/garantia/usuario/${id_ipad}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener garantías");
  return data;
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
    console.error("Error en obtenerTecnicoPorProceso:", error);
    throw error;
  }
};