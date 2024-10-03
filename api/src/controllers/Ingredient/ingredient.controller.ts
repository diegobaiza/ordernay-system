import { Request, Response } from 'express';
import Ingredient from '../../models/Ingredient/ingredient.model';

export class IngredientController {
  public async getIngredients(req: Request, res: Response): Promise<Response> {
    try {
      const ingredients = await Ingredient.findAll();
      if (ingredients.length === 0) {
        return res.status(404).json({ message: 'No ingredients found.' });
      }
      return res.json(ingredients);
    } catch (error) {
      return res.status(500).json({ message: `Error retrieving ingredients: ${error}` });
    }
  }

  public async createIngredient(req: Request, res: Response): Promise<Response> {
    try {
      const { name, quantity, unit } = req.body;

      // Valida los datos antes de crear el ingrediente
      if (!name || !quantity || !unit) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }

      const newIngredient = await Ingredient.create({
        name,
        quantity,
        unit,
      });

      return res.status(201).json(newIngredient);
    } catch (error) {
      return res.status(500).json({ message: `Error creating ingredient: ${error}` });
    }
  }

  public async getIngredient(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ingredient ID.' });
      }

      const ingredient = await Ingredient.findByPk(id);
      if (!ingredient) {
        return res.status(404).json({ message: 'Ingredient not found.' });
      }
      return res.json(ingredient);
    } catch (error) {
      return res.status(500).json({ message: `Error retrieving ingredient: ${error}` });
    }
  }

  public async updateIngredient(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ingredient ID.' });
      }

      const ingredient = await Ingredient.findByPk(id);
      if (!ingredient) {
        return res.status(404).json({ message: 'Ingredient not found.' });
      }

      const { name, quantity, unit } = req.body;

      // Valida los datos antes de actualizar el ingrediente
      if (name !== undefined) ingredient.name = name;
      if (quantity !== undefined) ingredient.quantity = quantity;
      if (unit !== undefined) ingredient.unit = unit;

      await ingredient.save();
      return res.json({ message: `Ingredient ${ingredient.name} updated.` });
    } catch (error) {
      return res.status(500).json({ message: `Error updating ingredient: ${error}` });
    }
  }

  public async deleteIngredient(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ingredient ID.' });
      }

      const ingredient = await Ingredient.findByPk(id);
      if (!ingredient) {
        return res.status(404).json({ message: 'Ingredient not found.' });
      }

      await ingredient.destroy();
      return res.json({ message: `Ingredient ${ingredient.name} deleted.` });
    } catch (error) {
      return res.status(500).json({ message: `Error deleting ingredient: ${error}` });
    }
  }
}

export const ingredientController = new IngredientController();
