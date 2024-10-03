import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User/user.model";
import dotenv from "dotenv";

dotenv.config();

export class AuthController {
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
        roleID
      });

      return res
        .status(201)
        .json({ message: "Usuario registrado con éxito", user: newUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el registro del usuario", error });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el inicio de sesión", error });
    }
  }

  // Verificar token JWT
  public verifyToken(req: Request, res: Response): Response {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Acceso denegado. Token no proporcionado." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return res.status(200).json({ message: "Token válido", decoded });
    } catch (error) {
      return res.status(401).json({ message: "Token inválido", error });
    }
  }
}

export const authController = new AuthController();
