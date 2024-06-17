/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Воробьев Джек Тигович',
        login: 'jack',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Данко Иван Шварценеггерович',
        login: 'danko',
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
