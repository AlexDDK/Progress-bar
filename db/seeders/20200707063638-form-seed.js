module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Forms',
      [{
        creator_id: 2,
        nameEmployee: 'Mikael',
        nameMentor: 'Vasya',
        link: 'http://localhost:3000/form/qwerty',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creator_id: 2,
        nameEmployee: 'Artyom',
        nameMentor: 'Vasya',
        link: 'http://localhost:3000/form/qwerty1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creator_id: 3,
        nameEmployee: 'Nika',
        nameMentor: 'Coolguy',
        link: 'http://localhost:3000/form/qwerty2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creator_id: 1,
        nameEmployee: 'Alexey',
        nameMentor: 'Vasya',
        link: 'http://localhost:3000/form/qwerty3',
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Forms', null, {});
  },
};
