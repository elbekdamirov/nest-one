import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class SigninUserDto {
  @ApiProperty({
    example: "user1@gmail.uz",
    description: "Foydalanuvchi pochtasi",
  })
  readonly email: string;

  @ApiProperty({
    example: "Uzbek13#4d",
    description: "Foydalanuvchi paroli",
  })
  readonly password: string;
}
