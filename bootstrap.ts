import AuthHandler from "./router/auth/handler"
import UserHandler from "./router/user/handler"
import TransactionHandler from "./router/transaction/handler";

import DBUserRepository from "./repository/user.repo"
import DBUserBalanceRepository from "./repository/user_balance.repo";
import DBUserBalanceHistoryRepository from "./repository/user_balance_history.repo";

import db from "./database/models";

// init repository
export const userRepo = new DBUserRepository(db)
export const userBalanceRepo = new DBUserBalanceRepository(db)
export const userBalanceHistoryRepo = new DBUserBalanceHistoryRepository(db)

// init handler / business logic
export const user = new UserHandler(userRepo);
export const auth = new AuthHandler(db);
export const transaction = new TransactionHandler({userRepo, userBalanceRepo, userBalanceHistoryRepo, db})