import { Test, TestingModule } from "@nestjs/testing";
import { userStub } from "../stubs/user.stub";
import { UserService } from "../user.service";
import { JwtService } from "@nestjs/jwt";
import { RolesService } from "../../roles/roles.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Role } from "../../roles/models/role.model";
import { CreateUserDto } from "../dto/create-user.dto";

describe("User service", () => {
  let userService: UserService;
  const mockUsersModel = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    destroy: jest.fn(),
  };

  const mockRolesModel = {
    findOne: jest.fn().mockImplementation((value: string) => "USER"),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken(Role),
          useValue: mockUsersModel,
        },
      ],
    }).compile();
    userService = moduleRef.get(UserService);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("createUser", () => {
    describe("when create User is called", () => {
      let createUserDto: CreateUserDto;
      let newUser: User;
      beforeEach(async () => {
        createUserDto = {
          name: userStub().name!,
          email: userStub().email!,
          password: userStub().password!,
          value: "user",
        };
        newUser = await userService.create(createUserDto);
        console.log(newUser);
      });
      it("should be create new user", async () => {
        expect(newUser).toMatchObject({
          ...userStub(),
        });
      });
    });
  });

  describe("findOne", () => {
    describe("when findOne is called", () => {
      test("then it should call userService", async () => {
        expect(await userService.findOne(userStub().id!)).toEqual(userStub());
      });
    });
  });

  describe("findAll", () => {
    describe("when findAll is called", () => {
      test("then it should call userService", async () => {
        expect(await userService.findAll()).toEqual([userStub()]);
      });
    });
  });
});
