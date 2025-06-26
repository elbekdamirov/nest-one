import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "../../roles/models/role.model";
import { UserRole } from "./user-role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: "1",
    description: "Foydalanuvchi unique id",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "user1@gmail.uz",
    description: "Foydalanuvchi pochtasi",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "Uzbek13#4d",
    description: "Foydalanuvchi paroli",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchi aktiv holati",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
