import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Order from "../Order/order.model";
import Product from "../Product/product.model";
import TableSite from "../Table/tableSite.model";

interface OrderDetailAttributes {
  id?: number;
  tableID?: number;
  orderID?: number;
  productID?: number;
  quantity?: number;
  total?: number;
}

@Table({
  tableName: "order_details",
  timestamps: true,
})
class OrderDetail
  extends Model<OrderDetailAttributes>
  implements OrderDetailAttributes
{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderID!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productID!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  price!: number;

  @BelongsTo(() => Order, {
    foreignKey: "orderID",
    as: "orders", // Cambiado a singular
  })
  order!: Order;

  @BelongsTo(() => Product, {
    foreignKey: "productID",
    as: "products", // Cambiado a singular
  })
  product!: Product;
}

export default OrderDetail;
