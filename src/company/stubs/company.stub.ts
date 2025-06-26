import { Company } from "../models/company.model";

export const companyStub = (): Partial<Company> => {
  return {
    id: 1,
    name: "Company1",
    phone: "+998917994565",
    email: "company1@mail.uz",
    address: "adress company1",
  };
};
