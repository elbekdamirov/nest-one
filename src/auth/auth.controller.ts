import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninUserDto } from "../user/dto/signin-user.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";

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
