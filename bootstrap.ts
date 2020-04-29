import AuthHandler from "./router/auth/handler"
import UserHandler from "./router/user/handler"

import DBUserRepository from "./repository/user.repo"
import db from "./database/models";

// init repository
export const userRepo = new DBUserRepository(db)

// init handler / business logic
export const user = new UserHandler(userRepo);
export const auth = new AuthHandler(db);