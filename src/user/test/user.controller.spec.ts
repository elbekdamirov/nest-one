import { JwtService } from "@nestjs/jwt";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { userStub } from "../stubs/user.stub";
import { CreateUserDto } from "../dto/create-user.dto";

jest.mock("../user.service");

describe("Users controller", () => {
  let usersController: UserController;
  let usersService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, JwtService],
    }).compile();

    usersService = moduleRef.get(UserService);
    usersController = moduleRef.get(UserController);

    jest.clearAllMocks();
  });
  it("User controller should be defined", () => {
    expect(usersController).toBeDefined();
  });

  it("User service should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("findAll", () => {
    describe("When findAll is called", () => {
      let users: User[];
      beforeAll(async () => {
        users = await usersController.findAll();
      });
      test("then it should call findAll", () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });
      test("then it should return users list", () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe("findOne", () => {
    describe("When findOne is called", () => {
      let user: User | null;
      beforeAll(async () => {
        user = await usersController.findOne(String(userStub().id));
      });
      test("then it should call findOne", () => {
        expect(usersService.findOne).toHaveBeenCalledWith(userStub().id);
      });
      test("then it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("create", () => {
    describe("When create user is called", () => {
      let user: User | null;
      let createUserDto: CreateUserDto;
      beforeAll(async () => {
        createUserDto = {
          name: userStub().name!,
          email: userStub().email!,
          password: userStub().password!,
          value: "user",
        };
        user = await usersController.create(createUserDto);
      });
      test("then it should call create", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });
      test("then it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("remove", () => {
    describe("When remove is called", () => {
      let message: object;
      beforeAll(async () => {
        message = await usersController.remove(String(userStub().id));
      });
      test("then it should call remove", () => {
        expect(usersService.remove).toHaveBeenCalledWith(userStub().id);
      });
      test("then it should return user", () => {
        expect(message).toEqual({ message: `Foydalanuvchi o'chirildi` });
      });
    });
  });

//   describe("remove", () => {
//     describe("When remove is called", () => {
//       let message: object;
//       beforeAll(async () => {
//         message = await usersController.remove(String(userStub().id));
//       });
//       test("then it should call remove", () => {
//         expect(usersService.remove).toHaveBeenCalledWith(userStub().id);
//       });
//       test("then it should return user", () => {
//         expect(message).toEqual({ message: `Foydalanuvchi o'chirildi` });
//       });
//     });
//   });
  
});
