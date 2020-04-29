import { IUser } from "../model/user.interface";

export interface IUserRepository {
  findById(id: number);
}