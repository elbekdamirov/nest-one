import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Foydalanuvchilar")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "Foydalanuvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Created User",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilar ro'yxatini olish" })
  @ApiResponse({
    status: 201,
    description: "List of Users",
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Foydalanuvchini Id raqami boyicha olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @HttpCode(200)
  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("add_role")
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  @HttpCode(200)
  @Post("remove_role")
  async removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.removeRole(addRoleDto);
  }

  @HttpCode(200)
  @Post("activate")
  async activate(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activateUser(activateUserDto);
  }
}
