import axios from "axios";
import { Video } from "./VideoInterface";

const API = "http://localhost:4000";

// Todos los videos
export const getVideos = async () => {
  return await axios.get<Video[]>(`${API}/videos`);
};

// Solo un video
export const getVideo = async (id: string) => {
  return await axios.get(`${API}/videos/${id}`);
};

// Crear video
export const createVideo = async (video: Video) => {
  return await axios.post(`${API}/videos`, video);
};

// Actualizar Video
export const updateVideo = async (id: string, video: Video) => {
  return await axios.put(`${API}/videos/${id}`, video);
};

// Eliminar Video
export const deleteVideo = async (id: string) => {
  return await axios.delete(`${API}/videos/${id}`);
};
