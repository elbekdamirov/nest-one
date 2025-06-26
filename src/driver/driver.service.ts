import { Injectable } from "@nestjs/common";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Driver } from "./models/driver.model";

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver) private driverModel: typeof Driver) {}

  create(createDriverDto: CreateDriverDto) {
    return this.driverModel.create(createDriverDto);
  }

  findAll() {
    return this.driverModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.driverModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverModel.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    return driver[1][0];
  }

  async remove(id: number) {
    const res = await this.driverModel.destroy({ where: { id } });

    if (res > 0) {
      return `${id}-driver o'chirildi`;
    }

    return `${id} - driver yo'q`;
  }
}
