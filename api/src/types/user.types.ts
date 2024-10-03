export type UserRole = 'admin' | 'mesero' | 'cocinero' | 'bartender'; // Agrega o ajusta roles según tus necesidades

export interface User {
  id?: string;
  username?: string;
  name?: string;
  lastname?: string;
  role?: UserRole;
}
