module.exports = (sequelize: any, DataTypes: any) => {
  const UserBalanceHistory = sequelize.define("user_balance_history", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_balance_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    balance_before: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    balance_after: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("credit", "debit"),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_agent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: "user_balance_history",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return UserBalanceHistory;
};
