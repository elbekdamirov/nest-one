import { User } from "../models/user.model";

export const userStub = (): Partial<User> => {
  return {
    id: 1,
    name: "User1",
    email: "user1@mail.uz",
    password: "1234567",
    is_active: true,
  };
};
