import { JwtPayload } from "jsonwebtoken";
import { Document, Types } from "mongoose";

export type User = {
  name: string;
  email: string;
  password: string;
  age: number;
};

export type UserFromToken = JwtPayload &
  Pick<Partial<User> & { _id?: Types.ObjectId }, "email">;

export interface IUserDocument extends Document, User {}
