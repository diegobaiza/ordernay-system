import { Request, Response } from "express";
import SubCategory from "../../models/SubCategory/subCategory.model";
import Category from "../../models/Category/category.model";
import { stringify } from "querystring";

export class SubCategoryController {
  public static async getSubCategories(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { category } = req.query; // Desestructuramos el query para obtener el nombre de la categoría

      if (!category) {
        return res.status(400).json({ message: "Category name is required" });
      }

      // Buscar la categoría por su nombre
      const categoryData = await Category.findOne({
        where: { name: category.toString() }, // Filtrar por nombre de categoría
      });

      if (!categoryData) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Usar el categoryID encontrado para filtrar las subcategorías
      const subcategories = await SubCategory.findAll({
        where: { categoryID: categoryData.id },
        include: [{ model: Category, as: "categories" }], // Incluir relación con categorías
      });

      if (subcategories.length === 0) {
        return res.status(404).json({ message: "No subcategories found." });
      }

      return res.json(subcategories);
    } catch (error) {
      return res.status(500).json({
        message: `Error retrieving subcategories: ${error}`,
      });
    }
  }

  public static async createSubCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { name, categoryID } = req.body;

    // Validar campos necesarios
    if (!name || !categoryID) {
      return res.status(400).json({
        error: "CategoryID and name are required",
      });
    }

    try {
      const newSubCategory = await SubCategory.create({
        categoryID,
        name,
      });
      return res.status(201).json(newSubCategory);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error creating subcategory: ${error}` });
    }
  }

  public static async getSubCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid subcategory ID." });
    }

    try {
      const subcategory = await SubCategory.findByPk(id, {
        include: [{ model: Category, as: "categories" }], // Incluye la relación con Category si es necesario
      });
      if (!subcategory) {
        return res.status(404).json({ message: "SubCategory not found." });
      }
      return res.json(subcategory);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving subcategory: ${error}` });
    }
  }

  public static async updateSubCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid subcategory ID." });
    }

    const { categoryID, name } = req.body;

    try {
      const [updated] = await SubCategory.update(
        { categoryID, name },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ message: "SubCategory not found." });
      }
      const updatedSubCategory = await SubCategory.findByPk(id, {
        include: [{ model: Category, as: "categories" }], // Incluye la relación con Category si es necesario
      });
      return res.json(updatedSubCategory);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error updating subcategory: ${error}` });
    }
  }

  public static async deleteSubCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid subcategory ID." });
    }

    try {
      const deleted = await SubCategory.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: "SubCategory not found." });
      }
      return res.status(204).json({ message: "SubCategory deleted." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error deleting subcategory: ${error}` });
    }
  }

  public static async getSubCategoriesByCategory(
    req: Request,
    res: Response
  ): Promise<Response> {
    const categoryId = parseInt(req.params.categoryId, 10);
    try {
      const subcategories = await SubCategory.findAll({
        where: { categoryID: categoryId },
      });
      if (subcategories.length === 0) {
        return res
          .status(404)
          .json({ message: "No subcategories found for this category." });
      }
      return res.json(subcategories);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving subcategories: ${error}` });
    }
  }
}

export const subCategoryController = new SubCategoryController();
