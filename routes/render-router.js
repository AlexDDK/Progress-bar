const router = require('express').Router();
// const isRegistered = require('../middlewares/isRegistered');
// const authorized = require('../middlewares/authorized');
const { Form, User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/main', (req, res) => {
  res.render('main');
});

router.get('/error', (req, res) => {
  res.render('error', { message: 'Неверные данные. Проверьте e-mail и пароль' });
});

router.get('/allforms', async (req, res) => {
  const lists = await Form.findAll();
  res.json(lists);
});

router.get('/myforms', async (req, res) => {
  console.log('MMMMMYYYY  FFFFFFFOOOORMMMMS');
  const lists = await Form.findAll({ where: { creator_id: res.locals.userId } });
  console.log('88888888888888888888888888888888888888888', res.locals.userId);
  res.json(lists);
});

router.get('/allusers', async (req, res) => {
  const allusers = await User.findAll();
  res.json(allusers);
});

router.post('/main', async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user.email === email) {
      // if (await bcrypt.compare(pass, user.pass)) {
      if (pass === user.pass) {
        req.session.userEmail = user.email;
        req.session.userId = user.id;
        return res.redirect('/main').status(200);
      }
      res.sendStatus(418);
    }
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/newuser', async (req, res) => {
  const { email, pass } = req.body;
  try {
    await User.create({ email, pass, isAdmin: false });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/newform', async (req, res) => {
  const { nameEmployee, nameMentor, link } = req.body;
  try {
    await Form.create({
      creator_id: req.session.userId, nameEmployee, nameMentor, link,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/update', async (req, res) => { // adding role to the user and returning all users
  const { email, role } = req.body;
  console.log(role);
  try {
    const currUser = await User.findOne({
      where: { email },
    });
    if (role === 'admin') {
      await User.update({
        isAdmin: true,
      }, {
        where: {
          email,
        },
      });
    } else {
      await User.update({
        isAdmin: false,
      }, {
        where: {
          email,
        },
      });
    }
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.get('/logout', (req, res) => {
  console.log('VVVVVIIIIIIIHHHOOODDD');
  req.session.destroy();
  res.clearCookie('user_sid');
  // res.redirect('/');
  res.sendStatus(200);
});

module.exports = router;
