import { Request, Response } from "express";
import Product from "../../models/Product/product.model";
import Presentation from "../../models/Presentation/presentation.model";

export class PresentationController {
  public static async getPresentations(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // Obtener precios con la relación del producto si es necesario
      const presentation = await Presentation.findAll({
        include: [{ model: Product, as: "products" }],
      });
      return res.json(presentation);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al obtener las presentaciones ${error}` });
    }
  }

  public static async createPresentation(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { productID, presentation } = req.body;

    // Validar campos necesarios
    if (productID === undefined) {
      return res.status(400).json({
        error: "Faltan campos, ProductID o Presentacion",
      });
    }

    try {
      // Crear nueva presentacion
      const newPresentation = await Presentation.create({
        productID,
        presentation,
      });
      return res.status(201).json(newPresentation);
    } catch (error) {
      return res.status(500).json({
        message: `Error al crear la presentacion del producto: ${error}`,
      });
    }
  }

  public static async getPresentation(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de la presentacion invalida." });
    }

    try {
      // Obtener precio con la relación del producto si es necesario
      const presentation = await Presentation.findByPk(id, {
        include: [{ model: Product, as: "products" }],
      });
      if (!presentation) {
        return res
          .status(404)
          .json({ message: "Presentacion no encotrada..." });
      }
      return res.status(200).json(presentation);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error en obtener las presentaciones ${error}` });
    }
  }

  public static async updatePresentation(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de presentacion invalido" });
    }

    const { productID, presentation: newPresentation } = req.body;

    try {
      // Buscar precio
      const presentation = await Presentation.findByPk(id);
      if (!presentation) {
        return res.status(404).json({ message: "Presentacion no encontrada" });
      }

      // Actualizar campos
      if (productID !== undefined) presentation.productID = productID;
      if (newPresentation !== undefined)
        presentation.presentation = newPresentation;

      await presentation.save();
      return res.status(200).json(presentation);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al actualizar la presentacion ${error}` });
    }
  }

  public static async deletePresentation(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID de presentacion invalida" });
    }

    try {
      // Buscar y eliminar precio
      const presentation = await Presentation.findByPk(id);
      if (!presentation) {
        return res
          .status(404)
          .json({ message: "Presentacion a eliminar no encontrada" });
      }

      await presentation.destroy();
      return res.status(204).json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al eliminar la presentacion ${error}` });
    }
  }
}

export const presentationController = new PresentationController();
