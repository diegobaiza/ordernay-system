import axios from "axios";
import { TableProps } from "./TableInterface";

const API = "http://localhost:3300/api";

// Todos las Mesas
export const getTables = async () => {
  return await axios.get<TableProps[]>(`${API}/tables`);
};

// Solo una Mesa
export const getTable = async (id: string) => {
  return await axios.get(`${API}/tables/${id}`);
};

// Crear Mesa
export const createTable = async (table: TableProps) => {
  return await axios.post(`${API}/tables`, table);
};

// Actualizar Mesa
export const updateTable = async (id: string, video: TableProps) => {
  return await axios.put(`${API}/tables/${id}`, video);
};

// Eliminar Mesa
export const deleteTable = async (id: string) => {
  return await axios.delete(`${API}/tables/${id}`);
};
