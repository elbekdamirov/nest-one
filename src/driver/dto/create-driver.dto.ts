import { IsEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateDriverDto {
  @IsString()
  @IsEmpty()
  first_name: string;

  @IsString()
  @IsEmpty()
  last_name: string;

  @IsPhoneNumber("UZ")
  phone: string;
  driver_license: string;
}
