import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { RolesService } from "../roles/roles.service";
import { Role } from "../roles/models/role.model";
import { AddRoleDto } from "./dto/add-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly roleService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleService.findRoleByValue(createUserDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
      // throw new HttpException("Bunday role mavjud emas", HttpStatus.NOT_FOUND);
    }
    const user = await this.userModel.create(createUserDto);

    // await user.$set("roles", [role.id]); // UserRole.create(userId, roleId)

    return user;
  }

  findAll() {
    return this.userModel.findAll({
      include: {
        model: Role,
        attributes: ["id", "value"],
        through: { attributes: [] },
      },
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, {
      include: {
        model: Role,
        attributes: ["id", "value"],
        through: { attributes: [] },
      },
      attributes: ["name", "id", "email"],
    });
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });
    return user?.dataValues;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return { message: `Foydalanuvchi o'chirildi` };
  }

  //ADMIN
  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    if (!user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud emas");
    }

    const role = await this.roleService.findRoleByValue(addRoleDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }

    await user.$add("roles", role.id);

    const updatedUser = await this.userModel.findByPk(addRoleDto.userId, {
      include: { all: true },
    });
    return updatedUser;
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(addRoleDto.userId);
    if (!user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud emas");
    }

    const role = await this.roleService.findRoleByValue(addRoleDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }

    await user.$remove("roles", role.id);

    const updatedUser = await this.userModel.findByPk(addRoleDto.userId, {
      include: { all: true },
    });
    return updatedUser;
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userModel.findByPk(activateUserDto.userId);

    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    user.is_active = true;
    user.save();

    return user;
  }
}
