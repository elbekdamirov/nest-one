import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
}
