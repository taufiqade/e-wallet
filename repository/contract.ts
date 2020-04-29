import { IUser } from "../model/user.interface";
import { IUserBalance } from "../model/user_balance.interface";
import { IUserBalanceHistory } from "../model/user_balance_history.interface";

export interface IUserRepository {
  findById(id: number): Promise<IUser>;
  findBy(condition: object): Promise<IUser>;
}

export interface IUserBalanceRepository {
  findById(id: number): Promise<IUserBalance>;
  update(data: object, id: number): Promise<boolean>;
}

export interface IUserBalanceHistoryRepository {
  store(data: IUserBalanceHistory): Promise<boolean>;
}