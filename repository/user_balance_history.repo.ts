import { Op } from "sequelize";

export default class DBUserBalanceHistoryRepository {
  protected db;

  constructor(db) {
    this.db = db;
  }

  store(data, t) {
    return this.db.UserBalanceHistory.create(data, { transaction: t});
  }
}
