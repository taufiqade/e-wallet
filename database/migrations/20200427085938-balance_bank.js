'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('balance_bank', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      balance: {
        type: Sequelize.DECIMAL(30,2),
        allowNull: false,
        defaultValue: 0
      },
      balance_achieve: {
        type: Sequelize.DECIMAL(30,2),
        allowNull: false,
        defaultValue: 0
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      enable: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('balance_bank')
  }
};
