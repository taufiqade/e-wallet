import { IUserBalance } from "./user_balance.interface";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  iat?: number;
  user_balance?: IUserBalance;
  created_at?: string;
  updated_at?: string
}