import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Company } from "../../company/models/company.model";

interface IBuilderCreationAtrr {
  full_name: string;
  birth_day: Date;
  salary: number;
  image?: string;
  companyId: number;
}

@Table({ tableName: "builders" })
export class Builder extends Model<Builder, IBuilderCreationAtrr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare birth_date: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare salary: number;

  @Column({
    type: DataType.STRING,
  })
  declare image: string;

  @ForeignKey(() => Company)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  declare companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
