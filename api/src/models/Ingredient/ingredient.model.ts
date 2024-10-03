import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  interface IngredientAttributes {
    id?: number;
    name?: string;
    quantity?: number;
    unit?: string;
  }
  
  @Table({
    tableName: 'ingredients',
    timestamps: true, // Incluye createdAt y updatedAt
  })
  class Ingredient extends Model<IngredientAttributes> implements IngredientAttributes {
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
      type: DataType.INTEGER,
      allowNull: false,
    })
    quantity!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    unit!: string;
  }
  
  export default Ingredient;
  