import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Presentation from "../Presentation/presentation.model";
import { initializatePrices } from "./dataPrice";

interface PriceAttributes {
  id?: number;
  presentationID: number;
  price?: GLfloat;
  currency: string;
  // valid_from?: Date;
  // valid_until?: Date;
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

  @ForeignKey(() => Presentation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  presentationID!: number;

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

  // @Column({
  //   type: DataType.DATE,
  //   allowNull: false,
  // })
  // valid_from!: Date;

  // @Column({
  //   type: DataType.DATE,
  //   allowNull: true,
  // })
  // valid_until?: Date;

  @BelongsTo(() => Presentation, {
    foreignKey: "presentationID",
    as: "presentations",
  })
  presentation!: Presentation;
}

initializatePrices;

export default Price;
