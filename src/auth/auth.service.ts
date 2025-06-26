import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/models/user.model";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { SigninUserDto } from "../user/dto/signin-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: user.roles,
    };

    let token: any;
    try {
      token = this.jwtService.sign(payload);
    } catch (error) {
      console.log(error);
    }

    return token;
  }

  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(
      createUserDto.email
    );

    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    createUserDto.password = hashedPassword;
    const user = await this.userService.create(createUserDto);

    return user;
  }

  async signin(signinUserDto: SigninUserDto) {
    const user = await this.userService.getUserByEmail(signinUserDto.email);

    if (!user) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const token = await this.generateToken(user);

    return { message: "User signed in", id: user.id, token };
  }
}
