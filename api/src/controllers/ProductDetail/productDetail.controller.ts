import { Request, Response } from "express";
import ProductDetail from "../../models/ProductDetail/productDetail.model";
import Product from "../../models/Product/product.model";

export class ProductDetailController {
  public static async getProductDetails(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      // Obtener detalles del producto con la relación de producto si es necesario
      const productDetails = await ProductDetail.findAll({
        include: [{ model: Product, as: "product" }],
      });
      if (productDetails.length === 0) {
        return res.status(404).json({ message: "No product details found." });
      }
      return res.json(productDetails);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving product details: ${error}` });
    }
  }

  public static async createProductDetail(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { productID, detail_key, detail_value } = req.body;

    // Validar campos necesarios
    if (
      productID === undefined ||
      detail_key === undefined ||
      detail_value === undefined
    ) {
      return res
        .status(400)
        .json({
          error:
            "Missing required fields: productID, detail_key, detail_value.",
        });
    }

    try {
      // Crear nuevo detalle del producto
      const newProductDetail = await ProductDetail.create({
        productID,
        detail_key,
        detail_value,
      });
      return res.status(201).json(newProductDetail);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating product detail: ${error}` });
    }
  }

  public static async getProductDetail(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product detail ID." });
    }

    try {
      // Obtener detalle del producto con la relación de producto si es necesario
      const productDetail = await ProductDetail.findByPk(id, {
        include: [{ model: Product, as: "product" }],
      });
      if (!productDetail) {
        return res.status(404).json({ message: "ProductDetail not found." });
      }
      return res.json(productDetail);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving product detail: ${error}` });
    }
  }

  public static async updateProductDetail(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product detail ID." });
    }

    const { productID, detail_key, detail_value } = req.body;

    try {
      // Buscar detalle del producto
      const productDetail = await ProductDetail.findByPk(id);
      if (!productDetail) {
        return res.status(404).json({ message: "ProductDetail not found." });
      }

      // Actualizar campos
      if (productID !== undefined) productDetail.productID = productID;
      if (detail_key !== undefined) productDetail.detail_key = detail_key;
      if (detail_value !== undefined) productDetail.detail_value = detail_value;

      await productDetail.save();
      return res
        .status(200)
        .json({
          message: `ProductDetail ${productDetail.detail_key} updated.`,
        });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error updating product detail: ${error}` });
    }
  }

  public static async deleteProductDetail(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product detail ID." });
    }

    try {
      // Buscar y eliminar detalle del producto
      const productDetail = await ProductDetail.findByPk(id);
      if (!productDetail) {
        return res.status(404).json({ message: "ProductDetail not found." });
      }

      await productDetail.destroy();
      return res.status(204).json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error deleting product detail: ${error}` });
    }
  }
}

export const productDetailController = new ProductDetailController();
