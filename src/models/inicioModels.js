// models/inicioModels.js
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

// === Obtener un iPad específico por ID ===
export const obtenerIpadPorId = async (id_ipad) => {
  const token = await getAuthToken();
  const res = await fetch(`${BASE_URL}/ipad/usuario/${id_ipad}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al obtener iPad");
  return data;
};

// === Obtener garantías de un iPad específico ===
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