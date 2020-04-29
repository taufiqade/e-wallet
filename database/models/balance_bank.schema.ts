module.exports = (sequelize: any, DataTypes: any) => {
  const BalanceBank = sequelize.define("balance_bank", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    balance_achieve: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enable: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: "balance_bank",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  BalanceBank.associate = (models: any) => {
    models.BalanceBank.hasMany(models.BalanceBankHistory, {
      foreignKey: "balance_bank_id",
      as: "bank_balance_history",
    });
  };
  return BalanceBank;
};
