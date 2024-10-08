import { Request, Response } from "express";
import Product from "../../models/Product/product.model";
import Category from "../../models/Category/category.model";
import SubCategory from "../../models/SubCategory/subCategory.model";
// import Price from "../../models/Price/price.model";
import Presentation from "../../models/Presentation/presentation.model";

export class ProductController {
  public static async getProducts(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { subcategory } = req.query; // Obtener subcategoría desde la consulta

      const whereClause = subcategory
        ? { subCategoryID: subcategory.toString() }
        : {};

      const products = await Product.findAll({
        where: whereClause,
        include: [{ model: SubCategory, as: "subCategory" }],
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "No products found." });
      }
      return res.json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving products: ${error}` });
    }
  }

  public static async createProduct(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { name, subCategoryID, description, is_active } = req.body;

    if (name === undefined || subCategoryID === undefined) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name and sub category ID" });
    }

    try {
      // Crear nuevo producto
      const newProduct = await Product.create({
        name,
        subCategoryID,
        description,
        is_active,
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating product: ${error}` });
    }
  }

  public static async getProduct(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID." });
    }

    try {
      const product = await Product.findByPk(id, {
        include: [{ model: SubCategory, as: "subCategory" }],
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
      return res.json(product);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving product: ${error}` });
    }
  }

  public static async updateProduct(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID." });
    }

    const { name, subCategoryID, description, is_active } = req.body;

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      if (name !== undefined) product.name = name;
      if (subCategoryID !== undefined) product.subCategoryID = subCategoryID;
      if (description !== undefined) product.description = description;
      if (is_active !== undefined) product.is_active = is_active;

      await product.save();
      return res
        .status(200)
        .json({ message: `Product ${product.name} updated.` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error updating product: ${error}` });
    }
  }

  public static async deleteProduct(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID." });
    }

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      await product.destroy();
      return res.status(204).json();
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error deleting product: ${error}` });
    }
  }

  public static async getProductsBySubCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    const subCategoryId = parseInt(req.params.subCategoryId, 10);
    try {
      const products = await Product.findAll({
        where: { subCategoryID: subCategoryId },
      });
      if (products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for this subcategory." });
      }
      return res.json(products);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving products: ${error}` });
    }
  }
}

export const productController = new ProductController();
