import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBuilderDto } from "./dto/create-builder.dto";
import { UpdateBuilderDto } from "./dto/update-builder.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Builder } from "./models/builder.model";
import { Company } from "../company/models/company.model";
import { CompanyService } from "../company/company.service";
import { FilesService } from "../files/files.service";

@Injectable()
export class BuildersService {
  constructor(
    @InjectModel(Builder) private builderModel: typeof Builder,
    // @InjectModel(Company) private companyModel: typeof Company, // 1-usul
    private readonly companyService: CompanyService, //2-usul
    private readonly fileService: FilesService
  ) {}

  async create(createBuilderDto: CreateBuilderDto, image: any) {
    const { companyId } = createBuilderDto;
    // const company = await this.companyModel.findByPk(companyId); // 1-usul
    const company = await this.companyService.getCompanyById(companyId); // 2-usul
    if (!company) {
      throw new BadRequestException("Bunday kompaniya mavjud emas");
    }

    const fileName = await this.fileService.saveFile(image);

    return this.builderModel.create({ ...createBuilderDto, image: fileName });
  }

  findAll() {
    return this.builderModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.builderModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateBuilderDto: UpdateBuilderDto) {
    const builder = await this.builderModel.update(updateBuilderDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0];
  }

  async remove(id: number) {
    const res = await this.builderModel.destroy({ where: { id } });

    if (res > 0) {
      return `${id}-builder o'chirildi`;
    }

    return `${id} - builder yo'q`;
  }
}
