import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import Product from "../Product/product.model";
import Price from "../Price/price.model";
import { initializatePresentation } from "./dataPresentation";

interface PresentationAttributes {
  id?: number;
  productID?: number;
  presentation: string;
}

@Table({
  tableName: "presentations",
  timestamps: true,
})
class Presentation
  extends Model<PresentationAttributes>
  implements PresentationAttributes
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
    allowNull: true,
  })
  presentation!: string;

  @BelongsTo(() => Product, {
    // foreignKey: "productID",
    as: "products",
  })
  product!: Product;

  @HasMany(() => Price, {
    // foreignKey: "priceID",
    as: "prices",
  })
  price!: Price;
}

initializatePresentation;

export default Presentation;
