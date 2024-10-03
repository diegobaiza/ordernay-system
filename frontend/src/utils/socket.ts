import { io } from "socket.io-client";

const socket = io("http://localhost:3300"); // Asegúrate de cambiar al puerto correcto del backend

export default socket;
