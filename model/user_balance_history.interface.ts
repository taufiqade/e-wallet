export interface IUserBalanceHistory {
  id?: number;
  user_balance_id: number;
  balance_before: number;
  balance_after: number;
  activity: string;
  type: string;
  ip: string;
  location: string;
  user_agent: string;
  author: string;
  created_at?: string;
  updated_at?: string;
}