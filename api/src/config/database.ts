import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";

import Category from "../models/Category/category.model";
import Ingredient from "../models/Ingredient/ingredient.model";
import Order from "../models/Order/order.model";
import OrderDetail from "../models/OrderDetail/orderDetail.model";
import Price from "../models/Price/price.model";
import Product from "../models/Product/product.model";
import ProductDetail from "../models/ProductDetail/productDetail.model";
import Role from "../models/Role/role.model";
import SubCategory from "../models/SubCategory/subCategory.model";
import TableSite from "../models/Table/tableSite.model";
import User from "../models/User/user.model";
import UserRole from "../models/UserRole/userRole.model";
import Presentation from "../models/Presentation/presentation.model";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      charset: "utf8",
    },
    models: [
      Role,
      Category,
      SubCategory,
      Product,
      ProductDetail,
      Price,
      Presentation,
      Order,
      OrderDetail,
      Ingredient,
      TableSite,
      User,
      UserRole,
    ],
  }
);

export default sequelize;
