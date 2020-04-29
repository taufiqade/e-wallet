module.exports = (sequelize: any, DataTypes: any) => {
  const UserBalance = sequelize.define("user_balance", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    balance_achieve: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: "user_balance",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  // UserBalance.associate = (models: any) => {
  //   models.UserBalance.hasMany(models.UserBalanceHistory, {
  //     foreignKey: "user_balance_id",
  //     as: "balance_history",
  //   });
  //   models.UserBalance.belongsTo(models.KycData, {
  //     foreignKey: "user_id",
  //     as: "kyc_data",
  //   });
  // };

  return UserBalance;
};
