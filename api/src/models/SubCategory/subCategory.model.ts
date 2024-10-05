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

interface SubCategoryAttributes {
  id?: number;
  name?: string;
  categoryID?: number;
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
    as: "category",
  })
  category!: Category;

  @HasMany(() => Product, {
    foreignKey: "subCategoryID",
    as: "products",
  })
  products!: Product[];
}

export default SubCategory;
