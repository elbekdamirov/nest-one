import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Machine } from "../../machine/models/machine.model";
import { Driver } from "../../driver/models/driver.model";

interface IMachineDriverCreationAttr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: "machine_river" })
export class MachineDriver extends Model<
  MachineDriver,
  IMachineDriverCreationAttr
> {
  @ForeignKey(() => Machine)
  @Column({
    type: DataType.INTEGER,
  })
  machineId: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
  })
  driverId: number;
}
