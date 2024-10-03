import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connection successful.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
