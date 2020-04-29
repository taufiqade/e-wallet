import * as dotenv from "dotenv";
import { DataTypes, Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    dialect: "mysql",
    protocol: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    define: {timestamps: false},
    dialectOptions: {
      multipleStatements: true,
      dateStrings: true,
      decimalNumbers: true,
      useUTC: false,
      typeCast(field: any, next: any) {
        if (field.type === "DATETIME") { return field.string(); }
        return next();
      },
    },
    timezone: process.env.TIMEZONE,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  },
);

const db = {
  sequelize,
  Sequelize,
  UserBalance: require("./user_balance.schema")(sequelize, DataTypes),
  Users: require("./users.schema")(sequelize, DataTypes),
  UserBalanceHistory: require("./user_balance_history.schema")(sequelize, DataTypes),
  BalanceBank: require("./balance_bank.schema")(sequelize, DataTypes),
  BalanceBankHistory: require("./balance_bank_history.schema")(sequelize, DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
