module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [{
        email: 'ya@mail.com',
        pass: '1234',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
      [{
        email: 'yo122@mail.com',
        pass: '1234',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
      [{
        email: '1234@mail.com',
        pass: '1234',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
      [{
        email: 'ya3fffffskskskss@mail.com',
        pass: '1234',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
