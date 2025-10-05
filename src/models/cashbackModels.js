// models/cashbackModels.js
import { getAuthToken } from "./tokenService";

const BASE_URL = "http://10.0.0.182:4003"; 

// === Obtener cashback del usuario ===
export const obtenerCashbackUsuario = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/cashback/usuario`, {
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
    console.log("Respuesta de obtenerCashbackUsuario:", data);
    
    if (!res.ok) {
      throw new Error(data.message || `Error HTTP ${res.status}`);
    }
    
    return data;
  } catch (error) {
    console.error("Error en obtenerCashbackUsuario:", error);
    throw error;
  }
};

// === Obtener productos de cashback ===
export const obtenerProductosCashback = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/cashback/productos`, {
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
    console.error("Error en obtenerProductosCashback:", error);
    throw error;
  }
};

// === Reclamar cashback ===
export const reclamarCashback = async (id_producto) => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/cashback/reclamar`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id_producto })
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
    console.error("Error en reclamarCashback:", error);
    throw error;
  }
};

// === Obtener historial de cashback ===
export const obtenerHistorialCashback = async () => {
  try {
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const res = await fetch(`${BASE_URL}/cashback/historial`, {
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
    console.error("Error en obtenerHistorialCashback:", error);
    throw error;
  }
};