import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import User from "../User/user.model";
  import TableSite from "../Table/tableSite.model";
  
  interface OrderAttributes {
    id?: number;
    usernameID?: number;
    tableID?: number;
    status?: string;
  }
  
  @Table({
    tableName: "orders",
    timestamps: true, // Incluye createdAt y updatedAt
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
      as: "table",
    })
    table!: TableSite;
  }
  
  export default Order;
  