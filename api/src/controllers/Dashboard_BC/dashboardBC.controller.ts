import { Request, Response } from "express";
import Order from "../../models/Order/order.model";
import OrderDetail from "../../models/OrderDetail/orderDetail.model";
import Category from "../../models/Category/category.model";
import SubCategory from "../../models/SubCategory/subCategory.model";
import Product from "../../models/Product/product.model";

export class DashboardController {
  // Obtener órdenes para Cocineros
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
            as: "orderDetails",
            include: [
              {
                model: Product,
                as: "product",
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

      // Separar productos en función de la categoría
      const filteredOrdersCocinero = orders
        .map((order) => {
          const cocineroItems = order.orderDetails
            .filter((detail) => {
              const categoryName = detail.product?.subCategory?.category?.name;
              return ["Comidas", "Desayunos"].includes(categoryName);
            })
            .map((detail) => ({
              name: detail.product.name,
              quantity: detail.quantity,
            }));

          if (cocineroItems.length > 0) {
            return {
              id: order.id,
              tableNumber: order.tableID,
              items: cocineroItems,
            };
          }
        })
        .filter(Boolean); // Filtrar nulos

      console.log(
        "Órdenes filtradas para Cocinero:",
        JSON.stringify(filteredOrdersCocinero)
      );

      return res.json({
        cocineroOrders: {
          currentOrder: filteredOrdersCocinero[0] || null,
          nextOrder: filteredOrdersCocinero[1] || null,
          ordersInQueue: filteredOrdersCocinero.slice(2),
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving orders for cocinero: ${error}` });
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
            as: "orderDetails",
            include: [
              {
                model: Product,
                as: "product",
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

      // Separar productos en función de la categoría
      const filteredOrdersBartender = orders
        .map((order) => {
          const bartenderItems = order.orderDetails
            .filter((detail) => {
              const categoryName = detail.product?.subCategory?.category?.name;
              return categoryName === "Bebidas";
            })
            .map((detail) => ({
              name: detail.product.name,
              quantity: detail.quantity,
            }));

          if (bartenderItems.length > 0) {
            return {
              id: order.id,
              tableNumber: order.tableID,
              items: bartenderItems,
            };
          }
        })
        .filter(Boolean); // Filtrar nulos

      console.log(
        "Órdenes filtradas para Bartender:",
        JSON.stringify(filteredOrdersBartender)
      );

      return res.json({
        bartenderOrders: {
          currentOrder: filteredOrdersBartender[0] || null,
          nextOrder: filteredOrdersBartender[1] || null,
          ordersInQueue: filteredOrdersBartender.slice(2),
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving orders for bartender: ${error}` });
    }
  }
}

export const dashboardController = new DashboardController();
