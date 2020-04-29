'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_balance_history', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_balance_id: {
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
      queryInterface.addConstraint('user_balance_history', ['user_balance_id'],{
        type: 'foreign key',
        name: 'fk_user_balance_user_balance_history',
        references: { //Required field
          table: 'user_balance',
          field: 'id'
        },
        onDelete: 'no action',
        onUpdate: 'no action'
      })
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_balance_history')
  }
};
