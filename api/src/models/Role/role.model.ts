import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import User from "../User/user.model";
import { initializeRoles } from "./dataRole";

interface RoleAttributes {
  id?: number;
  name?: string;
  description?: string;
}

@Table({
  tableName: "roles",
  timestamps: true,
})
class Role extends Model<RoleAttributes> implements RoleAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @HasMany(() => User)
  users!: User[];
}

initializeRoles;

export default Role;
