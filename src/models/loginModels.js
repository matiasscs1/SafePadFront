import { getAuthToken } from "./tokenService";

const BASE_URL = "http://10.0.0.166:4003"; 

// === Registro de Usuario ===
export const registrarUsuario = async (usuarioData) => {
  const res = await fetch(`${BASE_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// === Login Usuario ===
export const loginUsuario = async (correo, contrasena) => {
  
  console.log("Iniciando login para:", correo); // Log para depuración
  console.log("Contraseña proporcionada:", contrasena ? "Sí" : "No"); // No mostrar la contraseña real
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// === Login Admin ===
export const loginAdmin = async (correo, contrasena) => {
  const res = await fetch(`${BASE_URL}/login/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// === Cambiar contraseña ===
export const cambiarContrasena = async (correo, nueva_contrasena, pregunta_seguridad) => {
  const res = await fetch(`${BASE_URL}/cambiar-contrasena`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, nueva_contrasena, pregunta_seguridad }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// === Asignar iPad al usuario ===
export const ingresarSerial = async (serial_ipad) => {
  const token = await getAuthToken(); // tu función para leer el token del storage
  const res = await fetch(`${BASE_URL}/ipad/asignar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ serial_ipad }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// === Eliminar Usuario (ADMIN) ===
export const eliminarUsuario = async (id) => {
  const token = await getAuthToken();
  const res = await fetch(`${BASE_URL}/usuario/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
