import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import Role from "../../models/Role/role.model";
import User from "../../models/User/user.model";

// Obtener todos los usuarios
export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Role,
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener usuarios ${error}` });
  }
};

// Crear múltiples usuarios
export const createUser: RequestHandler = async (req, res) => {
  const users = req.body;

  // Verificar que el cuerpo de la solicitud sea un arreglo
  if (!Array.isArray(users)) {
    return res
      .status(400)
      .json({ message: "La solicitud debe ser un arreglo de usuarios." });
  }

  try {
    const createdUsers = [];

    for (const user of users) {
      const { username, password, name, lastName, roleID } = user;

      // Validar que los campos requeridos estén presentes
      if (!username || !password || !name || !lastName || !roleID) {
        return res
          .status(400)
          .json({
            message: "Faltan campos obligatorios en uno de los usuarios.",
          });
      }

      // Verificar si el usuario ya existe
      const userFound = await User.findOne({ where: { username } });
      if (userFound) {
        return res
          .status(400)
          .json({ message: `El usuario ${username} ya existe.` });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      const newUser = await User.create({
        username,
        password: hashedPassword,
        name,
        lastName,
        roleID,
      });

      createdUsers.push(newUser);
    }

    return res
      .status(201)
      .json({ message: "Usuarios creados exitosamente.", createdUsers });
  } catch (error) {
    return res.status(500).json({ message: `Error creating users: ${error}` });
  }
};

// Obtener un usuario por ID
export const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: { model: Role, as: "role" },
    });
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving user: ${error}` });
  }
};

// Eliminar un usuario
export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    await user.destroy();
    return res.json({ message: `User ${user.name} deleted.` });
  } catch (error) {
    return res.status(500).json({ message: `Error deleting user: ${error}` });
  }
};

// Actualizar un usuario
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const { username, name, lastName, password, roleID } = req.body;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    await user.update({
      username,
      name,
      lastName,
      password: hashedPassword,
      roleID,
    });
    return res.json({ message: `User ${user.username} updated.` });
  } catch (error) {
    return res.status(500).json({ message: `Error updating user: ${error}` });
  }
};
