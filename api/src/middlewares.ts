import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

export default (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
