import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import User from "../User/user.model";
import TableSite from "../Table/tableSite.model";
import OrderDetail from "../OrderDetail/orderDetail.model";

interface OrderAttributes {
  id?: number;
  usernameID?: number;
  tableID?: number;
  status?: string;
}

@Table({
  tableName: "orders",
  timestamps: true,
})
class Order extends Model<OrderAttributes> implements OrderAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usernameID!: number;

  @ForeignKey(() => TableSite)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tableID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @BelongsTo(() => User, {
    foreignKey: "usernameID",
    as: "user",
  })
  user!: User;

  @BelongsTo(() => TableSite, {
    foreignKey: "tableID",
    as: "tables",
  })
  table!: TableSite;

  @HasMany(() => OrderDetail, {
    foreignKey: "orderID",
    as: "orderDetails",
  })
  orderDetails!: OrderDetail[];
}

export default Order;
