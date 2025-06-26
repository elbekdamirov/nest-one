import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { CompanyController } from "../company.controller";
import { CompanyService } from "../company.service";
import { companyStub } from "../stubs/company.stub";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { Company } from "../models/company.model";
import { UpdateCompanyDto } from "../dto/update-company.dto";

jest.mock("../company.service");

describe("Companies controller", () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService, JwtService],
    }).compile();

    companyService = moduleRef.get(CompanyService);
    companyController = moduleRef.get(CompanyController);

    jest.clearAllMocks();
  });
  it("Company controller should be defined", () => {
    expect(companyController).toBeDefined();
  });

  it("Company service should be defined", () => {
    expect(companyService).toBeDefined();
  });

  describe("findAll", () => {
    describe("When findAll is called", () => {
      let companies: Company[];
      beforeAll(async () => {
        companies = await companyController.getAllCompanies();
      });
      test("then it should call findAll", () => {
        expect(companyService.getAllCompanies).toHaveBeenCalled();
      });
      test("then it should return companies list", () => {
        expect(companies).toEqual([companyStub()]);
      });
    });
  });

  describe("findOne", () => {
    describe("When findOne is called", () => {
      let company: Company | null;
      beforeAll(async () => {
        company = await companyController.getCompanyById(
          Number(companyStub().id)
        );
      });
      test("then it should call findOne", () => {
        expect(companyService.getCompanyById).toHaveBeenCalledWith(
          companyStub().id
        );
      });
      test("then it should return company", () => {
        expect(company).toEqual(companyStub());
      });
    });
  });

  describe("create", () => {
    describe("When create company is called", () => {
      let company: Company | null;
      let createCompanyDto: CreateCompanyDto;
      beforeAll(async () => {
        createCompanyDto = {
          name: companyStub().name!,
          email: companyStub().email!,
          phone: companyStub().phone!,
          address: companyStub().address!,
        };
        company = await companyController.createCompany(createCompanyDto);
      });
      test("then it should call create", () => {
        expect(companyService.createCompany).toHaveBeenCalledWith(
          createCompanyDto
        );
      });
      test("then it should return company", () => {
        expect(company).toEqual(companyStub());
      });
    });
  });

  describe("remove", () => {
    describe("When remove is called", () => {
      let message: string;
      beforeAll(async () => {
        message = await companyController.deleteCompanyById(
          Number(companyStub().id)
        );
      });
      test("then it should call remove", () => {
        expect(companyService.deleteCompanyById).toHaveBeenCalledWith(
          companyStub().id
        );
      });
      test("then it should return company", () => {
        expect(message).toEqual(`${companyStub().id}-kompaniya o'chirildi`);
      });
    });
  });

  describe("update", () => {
    describe("When update company is called", () => {
      let company: Company | null;
      let updateCompanyDto: UpdateCompanyDto;
      beforeAll(async () => {
        updateCompanyDto = {
          name: companyStub().name,
          email: companyStub().email,
          phone: companyStub().phone,
          address: companyStub().address,
        };
        company = await companyController.updateCompanyById(
          Number(companyStub().id),
          updateCompanyDto
        );
      });
      test("then it should call create", () => {
        expect(companyService.updateCompanyById).toHaveBeenCalledWith(
          Number(companyStub().id),
          updateCompanyDto
        );
      });
      test("then it should return company", () => {
        expect(company).toEqual(companyStub());
      });
    });
  });
});
