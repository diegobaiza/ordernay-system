import { Request, Response } from "express";
import Role from "../../models/Role/role.model";
import User from "../../models/User/user.model";

export class RoleController {
  public static async getRoles(req: Request, res: Response): Promise<Response> {
    try {
      // Obtener roles con la relación de usuarios si es necesario
      const roles = await Role.findAll({
        include: [{ model: User, as: "users" }],
      });
      if (roles.length === 0) {
        return res.status(404).json({ message: "No roles found." });
      }
      return res.json(roles);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving roles: ${error}` });
    }
  }

  public static async createRole(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { name, description } = req.body;

    // Validar campos necesarios
    if (!name) {
      return res.status(400).json({ error: "Role name is required." });
    }

    try {
      // Crear nuevo rol
      const newRole = await Role.create({ name, description });
      return res.status(201).json(newRole);
    } catch (error) {
      return res.status(500).json({ message: `Error creating role: ${error}` });
    }
  }

  public static async getRole(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid role ID." });
    }

    try {
      // Obtener rol con la relación de usuarios si es necesario
      const role = await Role.findByPk(id, {
        include: [{ model: User, as: "users" }],
      });
      if (!role) {
        return res.status(404).json({ message: "Role not found." });
      }
      return res.json(role);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving role: ${error}` });
    }
  }

  public static async updateRole(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid role ID." });
    }

    const { name, description } = req.body;

    try {
      // Actualizar rol
      const [updated] = await Role.update(
        { name, description },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ message: "Role not found." });
      }
      const updatedRole = await Role.findByPk(id);
      return res.json(updatedRole);
    } catch (error) {
      return res.status(500).json({ message: `Error updating role: ${error}` });
    }
  }

  public static async deleteRole(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid role ID." });
    }

    try {
      // Eliminar rol
      const deleted = await Role.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: "Role not found." });
      }
      return res.status(204).json({ message: "Role deleted." });
    } catch (error) {
      return res.status(500).json({ message: `Error deleting role: ${error}` });
    }
  }
}

export const roleController = new RoleController();
