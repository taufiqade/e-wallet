'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_balance', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    }).then(()=>{
      queryInterface.addConstraint('user_balance', ['user_id'],{
        type: 'foreign key',
        name: 'fk_users_user_balance',
        references: { //Required field
          table: 'users',
          field: 'id'
        },
        onDelete: 'no action',
        onUpdate: 'no action'
      })
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_balance')
  }
};
