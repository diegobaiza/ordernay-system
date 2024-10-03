import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User/user.model";
import Role from "../../models/Role/role.model";
import UserRole from "../../models/UserRole/userRole.model";
import dotenv from "dotenv";

dotenv.config();

export class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    try {
      // Verificar si el usuario existe
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar si la contraseña es correcta
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Obtener el rol del usuario a través de la tabla intermedia UserRole
      const userRole = await UserRole.findOne({
        where: { usernameID: user.id },
        include: [Role],
      });

      if (!userRole) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      // Crear el token JWT con la información del usuario y su rol
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: userRole.role.name,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      // Devolver la respuesta con el token, el username, el role y el id del usuario
      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        user: {
          id: user.id, // Incluir el ID del usuario
          username: user.username,
          role: userRole.role.name,
        },
      });
    } catch (error) {
      // Mejorar el manejo del error
      console.error("Error en el inicio de sesión:", error);
      return res.status(500).json({
        message: "Error en el inicio de sesión",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  public async register(req: Request, res: Response): Promise<Response> {
    const { username, password, name, lastName, roleID } = req.body;

    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear nuevo usuario
      const newUser = await User.create({
        username,
        password: hashedPassword,
        name,
        lastName,
        roleID,
      });

      // Asociar el usuario al rol a través de la tabla intermedia UserRole
      await UserRole.create({
        usernameID: newUser.id,
        roleID: roleID,
      });

      return res.status(201).json({
        message: "Usuario registrado con éxito",
        user: newUser,
      });
    } catch (error) {
      console.error("Error en el registro del usuario:", error);
      return res.status(500).json({
        message: "Error en el registro del usuario",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  public verifyToken(req: Request, res: Response): Response {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No posees token para seguir" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return res.status(200).json({ message: "Token válido", decoded });
    } catch (error) {
      return res.status(401).json({
        message: "Token inválido",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}

export const authController = new AuthController();
