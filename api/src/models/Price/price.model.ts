import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { initializatePrices } from "./dataPrice";

interface PriceAttributes {
  id?: number;
  price?: GLfloat;
  currency: string;
}
@Table({
  tableName: "prices",
  timestamps: true,
})
class Price extends Model<PriceAttributes> implements PriceAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: GLfloat;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency!: string;
}

initializatePrices;

export default Price;
