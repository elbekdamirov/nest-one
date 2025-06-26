import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Machine } from "../../machine/models/machine.model";
import { MachineDriver } from "../../machine-driver/models/machine-driver.model";

interface IDriverCreationAttr {
  first_name: string;
  last_name: string;
  phone: string;
  driver_license: string;
}

@Table({ tableName: "driver" })
export class Driver extends Model<Driver, IDriverCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare driver_license: string;

  @BelongsToMany(() => Machine, () => MachineDriver)
  machines: Machine[];
}
