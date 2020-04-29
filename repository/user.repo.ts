import { Op } from "sequelize";
import { IUser } from "./../model/user.interface";

export default class DBUserRepository {
  protected db;

  constructor(db) {
    this.db = db;
  }

  findById(id: number) {
    return this.db.Users.findOne({
      where: {id},
      include: [{
        model: this.db.UserBalance,
        required: true,
        as: "user_balance",
      }]
    })
  }

  findBy(conditon: object) {
    return this.db.Users.findOne({
      where: conditon,
      include: [{
        model: this.db.UserBalance,
        required: true,
        as: "user_balance",
      }]
    })
  }
}
