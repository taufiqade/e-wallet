import { Op } from "sequelize";

export default class DBUserBalanceRepository {
  protected db;

  constructor(db) {
    this.db = db;
  }

  findById(userId: number) {
    return this.db.UserBalance.findOne({
      where: {user_id: userId}
    })
  }

  update(data: object, id: number, t) {
    return this.db.UserBalance.update(data, {
      where: {id},
      transaction: t
    });
  }
}
