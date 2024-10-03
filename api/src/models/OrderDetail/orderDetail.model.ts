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

interface OrderDetailAttributes {
  id?: number;
  orderID?: number;
  productID?: number;
  quantity?: number;
  price?: number;
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
    allowNull: false,
  })
  price!: number;

  @BelongsTo(() => Order, {
    foreignKey: "orderID",
    as: "order",
  })
  order!: Order;

  @BelongsTo(() => Product, {
    foreignKey: "productID",
    as: "product",
  })
  product!: Product;
}

export default OrderDetail;
