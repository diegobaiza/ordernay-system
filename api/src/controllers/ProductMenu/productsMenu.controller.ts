import { Request, Response } from "express";
import ProductsMenu from "../../models/ProductMenu/productMenu.model";

export const getAllProductsMenu = async (req: Request, res: Response) => {
  try {
    const productsMenu = await ProductsMenu.findAll();
    res.status(200).json(productsMenu);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products menu", error });
  }
};

export const getProductMenuById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productMenu = await ProductsMenu.findByPk(id);
    if (productMenu) {
      res.status(200).json(productMenu);
    } else {
      res.status(404).json({ message: "Product Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product menu", error });
  }
};

export const createProductMenu = async (req: Request, res: Response) => {
  try {
    const productMenu = await ProductsMenu.create(req.body);
    res.status(201).json(productMenu);
  } catch (error) {
    res.status(500).json({ message: "Error creating product menu", error });
  }
};

export const updateProductMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await ProductsMenu.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedProductMenu = await ProductsMenu.findByPk(id);
      res.status(200).json(updatedProductMenu);
    } else {
      res.status(404).json({ message: "Product Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product menu", error });
  }
};

export const deleteProductMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ProductsMenu.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Product Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product menu", error });
  }
};
