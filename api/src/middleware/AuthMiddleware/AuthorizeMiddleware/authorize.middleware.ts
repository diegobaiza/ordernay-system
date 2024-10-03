import { Request, Response, NextFunction } from "express";

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.usernameID?.roleID; // Asegúrate de que `req.user` contenga el rol del usuario

    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción" });
    }

    next();
  };
};
