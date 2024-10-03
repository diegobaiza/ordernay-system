import { Request, Response } from "express";
import Price from "../../models/Price/price.model";
import Product from "../../models/Product/product.model";
import Presentation from "../../models/Presentation/presentation.model";

export class PriceController {
  public static async getPrices(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // Obtener precios con la relación del producto si es necesario
      const prices = await Price.findAll({
        include: [{ model: Presentation, as: "presentations" }],
      });
      return res.json(prices);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al Obtener Precios: ${error}` });
    }
  }

  public static async createPrice(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { presentationID, price, currency } = req.body;

    // Validar campos necesarios
    if (
      presentationID === undefined ||
      price === undefined ||
      currency !== undefined
    ) {
      return res
        .status(400)
        .json({ error: "Faltan campos, presentationID / price / currency" });
    }

    try {
      // Crear nuevo precio
      const newPrice = await Price.create({
        presentationID,
        price,
        currency,
      });
      return res.status(201).json(newPrice);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al crear el precio: ${error}` });
    }
  }

  public static async getPrice(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid price ID." });
    }

    try {
      // Obtener precio con la relación del producto si es necesario
      const price = await Price.findByPk(id, {
        include: [{ model: Presentation, as: "presentations" }],
      });
      if (!price) {
        return res.status(404).json({ message: "Price not found." });
      }
      return res.status(200).json(price);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error fetching price: ${error}` });
    }
  }

  public static async updatePrice(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid price ID." });
    }

    const { presentationID, price: newPrice, currency } = req.body;

    try {
      // Buscar precio
      const price = await Price.findByPk(id);
      if (!price) {
        return res.status(404).json({ message: "Price not found." });
      }

      // Actualizar campos
      if (presentationID !== undefined) price.presentationID = presentationID;
      if (newPrice !== undefined) price.price = newPrice;
      if (currency !== undefined) price.currency = currency;

      await price.save();
      return res.status(200).json(price);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al actualizar el precio: ${error}` });
    }
  }

  public static async deletePrice(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID del precio invalida" });
    }

    try {
      // Buscar y eliminar precio
      const price = await Price.findByPk(id);
      if (!price) {
        return res.status(404).json({ message: "Price no encontrado" });
      }

      await price.destroy();
      return res.status(204).json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al eliminar el precio ${error}` });
    }
  }
}

export const priceController = new PriceController();
