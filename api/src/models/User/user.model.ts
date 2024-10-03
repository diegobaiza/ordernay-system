import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
  AfterCreate,
} from "sequelize-typescript";
import Role from "../Role/role.model";
import UserRole from "../UserRole/userRole.model";
import { initializeUsers } from "../../models/User/dataUser";

interface UserAttributes {
  id?: number;
  username?: string;
  password: string;
  name?: string;
  lastName?: string;
  roleID?: number;
}

@Table({
  tableName: "users",
  timestamps: true, // Incluye createdAt y updatedAt
})
class User extends Model<UserAttributes> implements UserAttributes {
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
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleID!: number;

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];

  // Hook que se ejecuta después de crear un usuario
  @AfterCreate
  static async addRoleToUser(user: User) {
    // Crear la relación en UserRole
    await UserRole.create({ usernameID: user.id, roleID: user.roleID });
  }
}
// initializeUsers;

export default User;
