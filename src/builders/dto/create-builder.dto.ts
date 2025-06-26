import {
  IsCurrency,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateBuilderDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  birth_day: Date;

  @IsCurrency()
  salary: number;

  companyId: number;
}
