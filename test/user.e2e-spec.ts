import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { error } from "console";

describe("User (e2e)", () => {
  let app: INestApplication;
  let token: String;

  //   jest.setTimeout(15000);
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        email: "adminaka2@mail.uz",
        password: "123456",
      });
    token = response.body.token;
    console.log("token", token);
  });
  it("/users (GET) --> 200 OK", () => {
    return request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("/users (GET) --> 401 Unauthorized error", () => {
    return (
      request(app.getHttpServer())
        .get("/user")
        //   .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  //   it("/auth/signup (POST) --> 201", async () => {
  //     return request(app.getHttpServer())
  //       .post("/auth/signup")
  //       .send({
  //         name: "admin uka",
  //         email: "adminuka71123@mail.uz",
  //         password: "Ushgeg13123#",
  //         value: "admin",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201);
  //   });

  //   it("/auth/signup (POST) --> 409", async () => {
  //     return request(app.getHttpServer())
  //       .post("/auth/signup")
  //       .send({
  //         name: "admin uka",
  //         email: "adminuka7@mail.uz",
  //         password: "Ushgeg13123#",
  //         value: "admin",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(409)
  //       .expect({
  //         message: "Bunday foydalanuvchi mavjud",
  //         error: "Conflict",
  //         statusCode: 409,
  //       });
  //   });

  it("/auth/signup (POST) --> 400 on Validation error", async () => {
    return request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        name: "admin uka",
        email: "adminuka7@mail.uz",
        password: "123",
        value: "admin",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({
        message: ["Parol yetarlicha mustahkam emas"],
        error: "Bad Request",
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
