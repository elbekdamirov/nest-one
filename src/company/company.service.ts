import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Company } from "./models/company.model";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company) private companyModel: typeof Company) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // return this.companyModel.create(createCompanyDto);
    const company = await this.companyModel.create(createCompanyDto);

    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.companyModel.findAll({ include: { all: true } });
  }

  async getCompanyById(id: number): Promise<Company | null> {
    return this.companyModel.findByPk(id, { include: { all: true } });
  }

  async deleteCompanyById(id: number): Promise<string> {
    const res = await this.companyModel.destroy({ where: { id } });

    if (res > 0) {
      return `${id}-kompaniya o'chirildi`;
    }

    return `${id} - kompaniya yo'q`;
  }

  async updateCompanyById(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyModel.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0];
  }

  // async findCompanyByName(name: string): Promise<Company | null> {
  //   return this.companyModel.findOne({ where: { name } });
  // }
}
