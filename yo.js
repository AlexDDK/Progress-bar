// function generateLink() {
//   const result = [];
//   const eng = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
//   for (let i = 0; i < 25; i += 1) {
//     const random = Math.round(Math.random() * eng.length - 0.5);
//     result.push(eng[random]);
//   }
//   return result.join('');
// }

const { Form, User } = require('./db/models');

async function test() {
  const asd = await User.create({
    email: 'mikael@yo.com',
    pass: '123',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  // const asd = await Form.create({
  //   creator_id: 1,
  //   nameEmployee: 'Mikael',
  //   nameMentor: 'Vasya',
  //   link: 'http://localhost:3000/qwerty',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
}
test();
