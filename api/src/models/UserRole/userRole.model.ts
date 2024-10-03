// src/models/UserRole/userRole.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "../User/user.model";
import Role from "../Role/role.model";

interface UserRoleAttributes {
  id?: number;
  usernameID?: number;
  roleID?: number;
}

@Table({
  tableName: "user_roles",
  timestamps: false, // No se incluyen createdAt y updatedAt
})
class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usernameID!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleID!: number;

  @BelongsTo(() => User, "usernameID")
  user!: User;

  @BelongsTo(() => Role, "roleID")
  role!: Role;
}

export default UserRole;
