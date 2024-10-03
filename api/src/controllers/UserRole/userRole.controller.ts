// src/controllers/userRole.controller.ts
import { RequestHandler } from 'express';
import UserRole from '../../models/UserRole/userRole.model';
import User from '../../models/User/user.model';
import Role from '../../models/Role/role.model';

// Obtener todos los roles de usuario
export const getUserRoles: RequestHandler = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Role, as: 'role' }
      ]
    });
    if (userRoles.length === 0) {
      return res.status(404).json({ message: 'No user roles found.' });
    }
    return res.json(userRoles);
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving user roles: ${error}` });
  }
};

// Crear un nuevo rol de usuario
export const createUserRole: RequestHandler = async (req, res) => {
  try {
    const { usernameID, roleID } = req.body;
    const newUserRole = await UserRole.create({ usernameID, roleID });
    return res.status(201).json(newUserRole);
  } catch (error) {
    return res.status(500).json({ message: `Error creating user role: ${error}` });
  }
};

// Obtener un rol de usuario por ID
export const getUserRole: RequestHandler = async (req, res) => {
  try {
    const userRole = await UserRole.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: Role, as: 'role' }
      ]
    });
    if (!userRole) return res.status(404).json({ message: 'UserRole not found.' });
    return res.json(userRole);
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving user role: ${error}` });
  }
};

// Eliminar un rol de usuario
export const deleteUserRole: RequestHandler = async (req, res) => {
  try {
    const userRole = await UserRole.findByPk(req.params.id);
    if (!userRole) return res.status(404).json({ message: 'UserRole not found.' });
    await userRole.destroy();
    return res.json({ message: `UserRole deleted.` });
  } catch (error) {
    return res.status(500).json({ message: `Error deleting user role: ${error}` });
  }
};
