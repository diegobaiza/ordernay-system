import express from "express";
import configureMiddlewares from "./middlewares";
import configureRoutes from "./routes";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configurar middlewares
configureMiddlewares(app);

// Configurar rutas
configureRoutes(app);

export default app;
