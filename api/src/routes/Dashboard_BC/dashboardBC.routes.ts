import { Router } from "express";
import { DashboardController } from "../../controllers/Dashboard_BC/dashboardBC.controller";

const dashboardRouter = Router();

dashboardRouter.get("/cocinero", DashboardController.getCocineroOrders);
dashboardRouter.get("/bartender", DashboardController.getBartenderOrders);

export default dashboardRouter;
