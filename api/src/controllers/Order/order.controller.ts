import { Request, Response } from "express";
import Order from "../../models/Order/order.model";
import OrderDetail from "../../models/OrderDetail/orderDetail.model"; // Importar el modelo de OrderDetail
import User from "../../models/User/user.model";
import TableSite from "../../models/Table/tableSite.model";
import Product from "../../models/Product/product.model";

export class OrderController {
  public async createOrder(req: Request, res: Response): Promise<Response> {
    const { usernameID, tableID, status, items } = req.body;

    console.log(req.body);

    // Validar datos necesarios
    if (!usernameID || !tableID || !status || !items || items.length === 0) {
      return res
        .status(400)
        .json({ error: "Missing required fields or no items in the order." });
    }

    try {
      // Crear la orden
      const order = await Order.create({ usernameID, tableID, status });

      // Crear los detalles de la orden
      for (const item of items) {
        const product = await Product.findOne({ where: { name: item.name } });

        if (!product) {
          return res
            .status(400)
            .json({ error: `Product ${item.name} not found` });
        }

        await OrderDetail.create({
          orderID: order.id,
          productID: product.id, // Convertir el nombre del producto a productID
          quantity: item.quantity,
          price: item.price,
        });
      }

      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({ error: `Error creating order: ${error}` });
    }
  }

  public async getOrder(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    try {
      // Buscar la orden
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

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    const { usernameID, tableID, status } = req.body;

    try {
      // Buscar la orden
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found." });
      }

      // Actualizar los campos
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

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID." });
    }

    try {
      // Buscar la orden
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
