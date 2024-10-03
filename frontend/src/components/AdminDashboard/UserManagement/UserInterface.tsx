export interface User {
  name: string;
  username: string;
  role: string;
  status: "activo" | "inactivo"; // Estado del usuario solo puede ser "activo" o "inactivo"
}
