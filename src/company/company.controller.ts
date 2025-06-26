import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { Company } from "./models/company.model";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Kompaniyalar")
@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto
  ): Promise<Company> {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }

  @Get(":id")
  async getCompanyById(@Param("id") id: number): Promise<Company | null> {
    return this.companyService.getCompanyById(id);
  }

  @Delete(":id")
  async deleteCompanyById(@Param("id") id: number): Promise<string> {
    return this.companyService.deleteCompanyById(id);
  }

  @Patch(":id")
  async updateCompanyById(
    @Param("id") id: number,
    @Body() updateCompanyDto: UpdateCompanyDto
  ): Promise<any> {
    return this.companyService.updateCompanyById(id, updateCompanyDto);
  }

  // @Post(":name")
  // async findByName(@Param("name") name: string): Promise<Company | null> {
  //   return this.companyService.findCompanyByName(name);
  // }
}
