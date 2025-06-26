import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/models/user.model";
import { SigninUserDto } from "../user/dto/signin-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() signinUserDto: SigninUserDto) {
    return this.authService.signin(signinUserDto);
  }
}
