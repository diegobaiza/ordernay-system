import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "../User/user.model"; // Importar el modelo de User

interface TableAttributes {
  id?: number;
  number?: number;
  seats?: number;
  is_available?: boolean;
  usernameID?: number; // Añadir el campo usernameID
}

@Table({
  tableName: "tables",
  timestamps: true, // Incluye createdAt y updatedAt
})
class TableSite extends Model<TableAttributes> implements TableAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  number!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  seats!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_available!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // Permitimos que sea null si no está asignada a ningún usuario
  })
  usernameID!: number; // Nueva columna para la relación

  @BelongsTo(() => User, { foreignKey: "usernameID", as: "user" })
  user!: User;
}

export default TableSite;
