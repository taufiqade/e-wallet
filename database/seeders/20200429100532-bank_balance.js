'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('balance_bank', [{
      balance: 10000000,
      balance_achieve: 0,
      code: "B001",
      enable: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('balance_bank', null, {});
  }
};