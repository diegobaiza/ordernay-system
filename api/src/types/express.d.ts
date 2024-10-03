import { User } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Aquí defines la propiedad `user` y su tipo
    }
  }
}
