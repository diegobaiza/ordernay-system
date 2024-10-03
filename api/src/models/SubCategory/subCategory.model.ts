import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Category from "../Category/category.model";
import Product from "../Product/product.model";
import { initializeCategories } from "../Category/dataCategory";

interface SubCategoryAttributes {
  id?: number;
  name?: string;
  categoryID?: number;
  // productID?: number;
}

@Table({
  tableName: "sub_categories",
  timestamps: true,
})
class SubCategory
  extends Model<SubCategoryAttributes>
  implements SubCategoryAttributes
{
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryID!: number;

  @BelongsTo(() => Category, {
    foreignKey: "categoryID",
    as: "categories",
  })
  category!: Category;

  @HasMany(() => Product, {
    // foreignKey: "product_ID",
    as: "products",
  })
  product!: Product[];
}

initializeCategories;

export default SubCategory;
