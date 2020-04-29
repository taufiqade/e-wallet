'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('balance_bank_history', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      balance_bank_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      balance_before: {
        type: Sequelize.DECIMAL(30,2),
        allowNull: false,
        defaultValue: 0
      },
      balance_after: {
        type: Sequelize.DECIMAL(30,2),
        allowNull: false,
        defaultValue: 0
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_agent: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
    // .then(()=>{
    //   queryInterface.addConstraint('balance_bank_history', ['balance_bank_id'],{
    //     type: 'foreign key',
    //     name: 'fk_balance_bank_balance_bank_history',
    //     references: { //Required field
    //       table: 'balance_bank',
    //       field: 'id'
    //     },
    //     onDelete: 'no action',
    //     onUpdate: 'no action'
    //   })
    // })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('balance_bank_history')
  }
};
