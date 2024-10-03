import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Category from "../Category/category.model";
import SubCategory from "../SubCategory/subCategory.model";
import Product from "../Product/product.model";

interface ProductsMenuAttributes {
  id?: number;
  productName?: string;
  productDescription?: string;
  categoryName?: string;
  subCategoryName?: string;
  categoryID?: number;
  subCategoryID?: number;
  productID?: number;
  isActive?: boolean;
  isFruit?: boolean;
}

@Table({
  tableName: "products_menu",
  timestamps: true, // Incluye createdAt y updatedAt
})
class ProductsMenu
  extends Model<ProductsMenuAttributes>
  implements ProductsMenuAttributes
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
  productName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  productDescription!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  categoryName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subCategoryName!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryID!: number;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subCategoryID!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productID!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isFruit!: boolean;

  // @BelongsTo(() => Category, {
  //   foreignKey: "categoryID",
  //   as: "category",
  // })
  // category!: Category;

  @BelongsTo(() => SubCategory, {
    foreignKey: "subCategoryID",
    as: "subcategory",
  })
  subCategory!: SubCategory;

  @BelongsTo(() => Product, {
    foreignKey: "productID",
    as: "product",
  })
  product!: Product;
}

export default ProductsMenu;
