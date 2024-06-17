/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      const clientsData = [
        {
          userId: 1,
          accountNumber: 1234567890,
          surname: 'Иванов',
          name: 'Иван',
          patronymic: 'Иванович',
          birthday: new Date('1990.01.01'),
          INN: 123456789010,
          responsibleUser: 'Воробьев Джек Тигович',
          status: 'Не в работе',
        },
        {
          userId: 1,
          accountNumber: 1234567891,
          surname: 'Петров',
          name: 'Алексей',
          patronymic: 'Анатольевич',
          birthday: new Date('1991-01-01'),
          INN: 123456789011,
          responsibleUser: 'Воробьев Джек Тигович',
          status: 'Не в работе',
        },
        {
          userId: 1,
          accountNumber: 1234567892,
          surname: 'Сидоров',
          name: 'Сергей',
          patronymic: 'Викторович',
          birthday: new Date('1992-01-01'),
          INN: 123456789012,
          responsibleUser: 'Воробьев Джек Тигович',
          status: 'Не в работе',
        },
        {
          userId: 1,
          accountNumber: 1234567893,
          surname: 'Кузнецов',
          name: 'Дмитрий',
          patronymic: 'Юрьевич',
          birthday: new Date('1993-01-01'),
          INN: 123456789013,
          responsibleUser: 'Воробьев Джек Тигович',
          status: 'Не в работе',
        },
        {
          userId: 1,
          accountNumber: 1234567894,
          surname: 'Васильев',
          name: 'Николай',
          patronymic: 'Владимирович',
          birthday: new Date('1994-01-01'),
          INN: 123456789014,
          responsibleUser: 'Воробьев Джек Тигович',
          status: 'Не в работе',
        },
        {
          userId: 2,
          accountNumber: 1234567895,
          surname: 'Миронов',
          name: 'Александр',
          patronymic: 'Валентинович',
          birthday: new Date('1995-01-01'),
          INN: 123456789015,
          responsibleUser: 'Данко Иван Шварценеггерович',
          status: 'Не в работе',
        },
        {
          userId: 2,
          accountNumber: 1234567896,
          surname: 'Фёдоров',
          name: 'Михаил',
          patronymic: 'Павлович',
          birthday: new Date('1996-01-01'),
          INN: 123456789016,
          responsibleUser: 'Данко Иван Шварценеггерович',
          status: 'Не в работе',
        },
        {
          userId: 2,
          accountNumber: 1234567897,
          surname: 'Семёнов',
          name: 'Василий',
          patronymic: 'Геннадьевич',
          birthday: new Date('1997-01-01'),
          INN: 123456789017,
          responsibleUser: 'Данко Иван Шварценеггерович',
          status: 'Не в работе',
        },
        {
          userId: 2,
          accountNumber: 1234567898,
          surname: 'Морозов',
          name: 'Игорь',
          patronymic: 'Олегович',
          birthday: new Date('1998-01-01'),
          INN: 123456789018,
          responsibleUser: 'Данко Иван Шварценеггерович',
          status: 'Не в работе',
        },
        {
          userId: 2,
          accountNumber: 1234567899,
          surname: 'Попов',
          name: 'Евгений',
          patronymic: 'Константинович',
          birthday: new Date('1999-01-01'),
          INN: 123456789019,
          responsibleUser: 'Данко Иван Шварценеггерович',
          status: 'Не в работе',
        },
      ];
  
      const clients = clientsData.map((client) => ({
        ...client,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert('Clients', clients);
    },
  
    async down(queryInterface, Sequelize) {
      await Client.destroy({
        truncate: {
          cascade: true,
        },
      });
    },
  };
  