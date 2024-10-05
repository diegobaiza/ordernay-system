import { Request, Response } from "express";
import OrderDetail from "../../models/OrderDetail/orderDetail.model";
import Order from "../../models/Order/order.model";
import Product from "../../models/Product/product.model";

export class OrderDetailController {
  public async createOrderDetail(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { orderID, productID, quantity } = req.body;

    // Validar datos necesarios
    if (
      orderID === undefined ||
      productID === undefined ||
      quantity === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields: orderID, productID, quantity, price.",
      });
    }

    try {
      // Crear el detalle de la orden
      const orderDetail = await OrderDetail.create({
        orderID,
        productID,
        quantity,
      });
      return res.status(201).json(orderDetail);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error creating order detail: ${error}` });
    }
  }

  public async getOrderDetail(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order detail ID." });
    }

    try {
      // Buscar el detalle de la orden
      const orderDetail = await OrderDetail.findByPk(id, {
        include: [
          { model: Order, as: "orders" },
          { model: Product, as: "products" },
        ],
      });
      if (!orderDetail) {
        return res.status(404).json({ error: "Order detail not found." });
      }
      return res.status(200).json(orderDetail);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error retrieving order detail: ${error}` });
    }
  }

  public async updateOrderDetail(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order detail ID." });
    }

    const { orderID, productID, quantity } = req.body;

    try {
      // Buscar el detalle de la orden
      const orderDetail = await OrderDetail.findByPk(id);
      if (!orderDetail) {
        return res.status(404).json({ error: "Order detail not found." });
      }

      // Actualizar los campos
      if (orderID !== undefined) orderDetail.orderID = orderID;
      if (productID !== undefined) orderDetail.productID = productID;
      if (quantity !== undefined) orderDetail.quantity = quantity;
      // if (price !== undefined) orderDetail.price = price;

      await orderDetail.save();
      return res
        .status(200)
        .json({ message: `Order detail ${orderDetail.id} updated.` });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error updating order detail: ${error}` });
    }
  }

  public async deleteOrderDetail(
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    // Validar id
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order detail ID." });
    }

    try {
      // Buscar el detalle de la orden
      const orderDetail = await OrderDetail.findByPk(id);
      if (!orderDetail) {
        return res.status(404).json({ error: "Order detail not found." });
      }

      await orderDetail.destroy();
      return res
        .status(200)
        .json({ message: `Order detail ${orderDetail.id} deleted.` });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error deleting order detail: ${error}` });
    }
  }
}

export const orderDetailController = new OrderDetailController();
