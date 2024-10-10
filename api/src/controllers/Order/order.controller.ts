import { Request, Response } from "express";
import Order from "../../models/Order/order.model";
import OrderDetail from "../../models/OrderDetail/orderDetail.model";
import User from "../../models/User/user.model";
import TableSite from "../../models/Table/tableSite.model";
import Product from "../../models/Product/product.model";
import Category from "../../models/Category/category.model";
import SubCategory from "../../models/SubCategory/subCategory.model";

export class OrderController {
  public async createOrder(req: Request, res: Response): Promise<Response> {
    const { usernameID, tableID, status, items } = req.body;

    console.log(req.body);

    if (!usernameID || !tableID || !status || !items || items.length === 0) {
      return res.status(400).json({
        error: "Missing required fields or no items in the order.",
      });
    }

    try {
      const order = await Order.create({ usernameID, tableID, status });

      const ordersForCocinero: any[] = [];
      const ordersForBartender: any[] = [];

      for (const item of items) {
        const product = await Product.findByPk(item.productID, {
          include: [
            {
              model: SubCategory,
              as: "subCategory",
              include: [
                {
                  model: Category,
                  as: "category",
                },
              ],
            },
          ],
        });

        if (!product) {
          return res
            .status(404)
            .json({ error: `Product not found: ID ${item.productID}` });
        }

        const categoryName = product.subCategory?.category?.name;

        // Clasificación por categoría
        if (categoryName === "Bebidas") {
          ordersForBartender.push({
            name: product.name,
            quantity: item.quantity,
          });
        } else if (["Desayunos", "Comidas"].includes(categoryName)) {
          ordersForCocinero.push({
            name: product.name,
            quantity: item.quantity,
          });
        }

        // Crear el detalle de la orden
        await OrderDetail.create({
          orderID: order.id,
          productID: item.productID,
          quantity: item.quantity,
        });
      }

      console.log(
        "Estas son las ordenes del cocinero" + JSON.stringify(ordersForCocinero)
      );

      console.log(
        "Estas son las ordenes del bartender" +
          JSON.stringify(ordersForBartender)
      );

      // Devolver las órdenes separadas para cocinero y bartender
      return res.status(200).json({
        message: "Order created successfully",
        cocineroOrders:
          ordersForCocinero.length > 0
            ? {
                currentOrder: {
                  id: order.id,
                  tableNumber: tableID,
                  items: ordersForCocinero,
                },
                nextOrder: null,
                ordersInQueue: [],
              }
            : null,
        bartenderOrders:
          ordersForBartender.length > 0
            ? {
                currentOrder: {
                  id: order.id,
                  tableNumber: tableID,
                  items: ordersForBartender,
                },
                nextOrder: null,
                ordersInQueue: [],
              }
            : null,
      });
    } catch (error) {
      return res.status(500).json({
        error: `Error creating order: ${error}`,
      });
    }
  }

  public async getOrder(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    try {
      const order = await Order.findByPk(id, {
        include: [
          { model: User, as: "user" },
          { model: TableSite, as: "table" },
        ],
      });
      if (!order) {
        return res.status(404).json({ error: "Order not found..." });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error retrieving order: ${error}` });
    }
  }

  public async updateOrder(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    const { usernameID, tableID, status } = req.body;

    try {
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }

      if (usernameID !== undefined) order.usernameID = usernameID;
      if (tableID !== undefined) order.tableID = tableID;
      if (status !== undefined) order.status = status;

      await order.save();
      return res.status(200).json({ message: `Order ${order.id} updated.` });
    } catch (error) {
      return res.status(500).json({ error: `Error updating order: ${error}` });
    }
  }

  public async deleteOrder(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    try {
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }

      await order.destroy();
      return res.status(200).json({ message: `Order ${order.id} deleted.` });
    } catch (error) {
      return res.status(500).json({ error: `Error deleting order: ${error}` });
    }
  }
}

export const orderController = new OrderController();
