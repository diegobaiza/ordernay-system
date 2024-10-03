import { Request, Response } from "express";
import Category from "../../models/Category/category.model";
import SubCategory from "../../models/SubCategory/subCategory.model";

export class CategoryController {
  public static async getCategories(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const categories = await Category.findAll({
        include: [{ model: SubCategory, as: "subcategories" }],
      });
      if (categories.length === 0) {
        return res.status(404).json({ message: "No categories found." });
      }
      return res.json(categories);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving categories: ${error}` });
    }
  }

  public static async createCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { name, description } = req.body;

      // Asegúrate de que description esté bien manejado (puede ser null o undefined)
      const newCategory = await Category.create({
        name,
        description: description ?? null, // Usa null si description no está definida
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating category: ${error}` });
    }
  }

  public static async getCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }
      return res.json(category);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving category: ${error}` });
    }
  }

  public static async updateCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }
      const { name, description } = req.body;
      await category.update({
        name,
        description: description ?? null, // Usa null si description no está definida
      });
      return res.json({ message: `Category ${category.name} updated.` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error updating category: ${error}` });
    }
  }

  public static async deleteCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }
      await category.destroy();
      return res.json({ message: `Category ${category.name} deleted.` });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error deleting category: ${error}` });
    }
  }
}
