'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'user1',
      email: 'user1@test.com',
      password:'test123', 
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user2',
      email: 'user2@test.com',
      password:'test123', 
      created_at: new Date(),
      updated_at: new Date()
    }])
    
    const user = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );
    const userRow = user[0];
    await queryInterface.bulkInsert('user_balance', [{
      user_id: userRow[0].id,
      balance: 1000000,
      balance_achieve: 1000000,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_id: userRow[1].id,
      balance: 1000000,
      balance_achieve: 1000000,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};