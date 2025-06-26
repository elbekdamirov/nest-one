import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user1",
    description: "Foydalanuvchi ismi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "user1@gmail.uz",
    description: "Foydalanuvchi pochtasi",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Uzbek13#4d",
    description: "Foydalanuvchi paroli",
  })
  @IsStrongPassword(
    { minLength: 6 },
    { message: "Parol yetarlicha mustahkam emas" }
  )
  password: string;

  @ApiProperty({
    example: "admin",
    description: "Foydalanuvchiga berilgan dastlabki role",
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
