import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import SubCategory from "../SubCategory/subCategory.model";
import { initializeCategories } from "./dataCategory";

interface CategoryAttributes {
  id?: number;
  name?: string;
  description?: string;
}

@Table({
  tableName: "categories",
  timestamps: true,
})
class Category extends Model<CategoryAttributes> implements CategoryAttributes {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @HasMany(() => SubCategory, {
    as: "sub_categories", // debe de ir en plural
  })
  subCategories!: SubCategory[];
}

initializeCategories;

export default Category;
