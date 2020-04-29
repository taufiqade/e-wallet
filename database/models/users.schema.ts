module.exports = (sequelize: any, DataTypes: any) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
    }}, {
      tableName: "users",
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
    },
  );
  Users.associate = (models) => {
    models.Users.hasOne(models.UserBalance, {
        foreignKey: "user_id",
        as: "user_balance",
    });
  };
  return Users;
};
