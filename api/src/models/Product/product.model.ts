import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import SubCategory from "../SubCategory/subCategory.model";
import OrderDetail from "../OrderDetail/orderDetail.model";

interface ProductAttributes {
  id?: number;
  name?: string;
  subCategoryID?: number;
  description?: string;
  is_active?: boolean;
}

@Table({
  tableName: "products",
  timestamps: true,
})
class Product extends Model<ProductAttributes> implements ProductAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subCategoryID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  is_active!: boolean;

  @BelongsTo(() => SubCategory, {
    foreignKey: "subCategoryID",
    as: "subCategory",
  })
  subCategory!: SubCategory;

  @HasMany(() => OrderDetail, {
    as: "orderDetails",
  })
  orderDetails!: OrderDetail[];
}

export default Product;
