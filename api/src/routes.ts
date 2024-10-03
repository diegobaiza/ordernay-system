import { Application } from "express";
import authRoutes from "./routes/Auth/auth.routes";
import authenticateToken from "./middleware/AuthMiddleware/auth.middleware";
import roleRoutes from "./routes/Role/role.routes";
import userRoutes from "./routes/User/user.routes";
import userRoleRouter from "./routes/UserRole/userRole.routes";
import ingredientRouter from "./routes/Ingredient/ingredient.routes";
import productRouter from "./routes/Product/product.routes";
import productDetailRouter from "./routes/ProductDetail/productDetail.routes";
import categoryRouter from "./routes/Category/category.routes";
import subCategoryRouter from "./routes/subCategory/subCategory.routes";
// import priceRouter from "./routes/Price/price.routes";
import tableRouter from "./routes/Table/table.routes";
import orderRouter from "./routes/Order/order.routes";
import orderDetailrouter from "./routes/OrderDetail/orderDetail.routes";
import productMenuRouter from "./routes/ProductMenu/productsMenu.routes";
// import presentationRouter from "./routes/Presentation/presentation.routes";
import priceRouter from "./routes/Price/price.routes";

export default (app: Application) => {
  // Configuración de rutas
  app.use("/api/auth", authRoutes);
  app.use("/api/roles", roleRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/userRoles", userRoleRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/ingredients", ingredientRouter);
  app.use("/api/productDetails", productDetailRouter);
  app.use("/api/subCategories", subCategoryRouter);
  app.use("/api/prices", priceRouter);
  app.use("/api/tables", tableRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/orderDetails", orderDetailrouter);
  app.use("/api/products-menu", productMenuRouter);
  // app.use("/api/presentations", presentationRouter);

  // Rutas Protegidas
  app.use("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.usernameID });
  });
};
