import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Product from "../Product/product.model";

interface ProductDetailAttributes {
  id?: number;
  productID?: number;
  detail_key?: string;
  detail_value?: string;
}

@Table({
  tableName: "product_details",
  timestamps: true, // Incluye createdAt y updatedAt
})
class ProductDetail
  extends Model<ProductDetailAttributes>
  implements ProductDetailAttributes
{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  detail_key!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  detail_value!: string;

  @BelongsTo(() => Product, {
    foreignKey: "productID",
    as: "product",
  })
  product!: Product;
}

export default ProductDetail;
