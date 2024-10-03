import dotenv from "dotenv";
dotenv.config();

console.log(process.env.HELLO);

export default {
  MYSQL_DATABASE: "ordernay_bd",
  MYSQL_USER: "root",
  MYSQL_PASSWORD: "",
  MYSQL_HOST: "localhost",
  MYSQL_PORT: 3308
};
