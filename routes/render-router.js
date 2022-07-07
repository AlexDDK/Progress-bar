const router = require('express').Router();
const fetch = require('node-fetch');
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

router.get('/logout', (req, res) => {
  console.log('VVVVVIIIIIIIHHHOOODDD');
  req.session.destroy();
  res.clearCookie('user_sid');
  // res.redirect('/');
  res.sendStatus(200);
});

router.get('/form/:link', async (req, res) => {
  const { link } = req.params;

  const response = await fetch('http://localhost:3000/db/linkId', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link }),
  });

  if (response.ok) {
    const data = await response.json();

    res.render('form', { data });
  } else {
    res.sendStatus(418);
  }
});

module.exports = router;
