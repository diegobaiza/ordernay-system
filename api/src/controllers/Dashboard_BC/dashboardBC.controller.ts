import { Request, Response } from "express";
import Order from "../../models/Order/order.model";
import OrderDetail from "../../models/OrderDetail/orderDetail.model";
import Category from "../../models/Category/category.model";
import SubCategory from "../../models/SubCategory/subCategory.model";
import Product from "../../models/Product/product.model";

export class DashboardController {
  // Obtener órdenes para Cocineros
  public static async getCocineroOrders(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const orders = await Order.findAll({
        where: { status: "pending" },
        include: [
          {
            model: OrderDetail,
            as: "orderDetails", // Debe coincidir con el alias en OrderDetail
            include: [
              {
                model: Product,
                as: "product", // Debe coincidir con el alias en Product
                include: [
                  {
                    model: SubCategory,
                    as: "subCategory", // Debe coincidir con el alias en SubCategory
                    include: [
                      {
                        model: Category,
                        as: "category", // Debe coincidir con el alias en Category
                        where: {
                          name: ["Desayuno", "Comida"], // Cocinero solo verá estas categorías
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for cocinero." });
      }

      // Transformar los datos si es necesario antes de enviarlos
      const transformedOrders = orders.map((order) => ({
        id: order.id,
        tableNumber: order.tableID,
        items: order.orderDetails.map((detail) => ({
          productName: detail.product.name,
          quantity: detail.quantity,
        })),
      }));

      return res.json({
        currentOrder: transformedOrders[0] || null,
        nextOrder: transformedOrders[1] || null,
        ordersInQueue: transformedOrders.slice(2),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving orders at cocinero: ${error}` });
    }
  }

  // Obtener órdenes para Bartenders
  public static async getBartenderOrders(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const orders = await Order.findAll({
        where: { status: "pending" },
        include: [
          {
            model: OrderDetail,
            as: "orderDetails", // Debe coincidir con el alias en OrderDetail
            include: [
              {
                model: Product,
                as: "product", // Debe coincidir con el alias en Product
                include: [
                  {
                    model: SubCategory,
                    as: "subCategory", // Debe coincidir con el alias en SubCategory
                    include: [
                      {
                        model: Category,
                        as: "category", // Debe coincidir con el alias en Category
                        where: {
                          name: "Bebidas", // Bartender solo verá esta categoría
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for bartender." });
      }

      const transformedOrders = orders.map((order) => ({
        id: order.id,
        tableNumber: order.tableID,
        items: order.orderDetails.map((detail) => ({
          productName: detail.product.name,
          quantity: detail.quantity,
        })),
      }));

      return res.json({
        currentOrder: transformedOrders[0] || null,
        nextOrder: transformedOrders[1] || null,
        ordersInQueue: transformedOrders.slice(2),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving orders at bartender: ${error}` });
    }
  }
}

export const dashboardController = new DashboardController();
