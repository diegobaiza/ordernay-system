import { Request, Response } from "express";
import TableSite from "../../models/Table/tableSite.model";

export class TableController {
  public static async getTables(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const tables = await TableSite.findAll();
      return res.json(tables);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching tables", error });
    }
  }

  public static async createTable(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { number, seats, is_available } = req.body;

    // Validar campos necesarios
    if (number === undefined) {
      return res.status(400).json({ error: "Number are required." });
    }

    try {
      const newTable = await TableSite.create({ number, seats, is_available });
      return res.status(201).json(newTable);
    } catch (error) {
      return res.status(500).json({ message: "Error creating table", error });
    }
  }

  public static async getTable(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid table ID." });
    }

    try {
      const table = await TableSite.findByPk(id);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
      return res.json(table);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching table", error });
    }
  }

  public static async updateTable(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid table ID." });
    }

    const { number, seats, is_available } = req.body;

    try {
      const table = await TableSite.findByPk(id);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }

      await table.update({ number, seats, is_available });
      return res.json(table);
    } catch (error) {
      return res.status(500).json({ message: "Error updating table", error });
    }
  }

  public static async deleteTable(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid table ID." });
    }

    try {
      const table = await TableSite.findByPk(id);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }

      await table.destroy();
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting table", error });
    }
  }

  public static async getTableByUserID(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { usernameID } = req.params;

    if (!usernameID) {
      return res.status(400).json({ error: "usernameID is required" });
    }

    try {
      const table = await TableSite.findOne({
        where: { usernameID: Number(usernameID) }, // Asegúrate de que el ID sea un número
      });

      if (!table) {
        return res
          .status(404)
          .json({ message: "Table not found for this user" });
      }

      return res.json({
        tableID: table.id,
        tableNumber: table.number,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching table for user", error });
    }
  }
}

export const tableController = new TableController();
