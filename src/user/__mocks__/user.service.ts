import { userStub } from "../stubs/user.stub";

export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findOne: jest.fn().mockResolvedValue(userStub()),
  remove: jest.fn().mockResolvedValue({ message: `Foydalanuvchi o'chirildi` }),
});
