import { companyStub } from "../stubs/company.stub";

export const CompanyService = jest.fn().mockReturnValue({
  createCompany: jest.fn().mockResolvedValue(companyStub()),
  getAllCompanies: jest.fn().mockResolvedValue([companyStub()]),
  getCompanyById: jest.fn().mockResolvedValue(companyStub()),
  deleteCompanyById: jest
    .fn()
    .mockResolvedValue(`${companyStub().id}-kompaniya o'chirildi`),
  updateCompanyById: jest.fn().mockResolvedValue(companyStub()),
});
