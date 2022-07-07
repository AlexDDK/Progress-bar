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
  log
  const lists = await Form.findAll({ where: { creator_id: req.locals.userId } });
  console.log('88888888888888888888888888888888888888888', req.locals.userId );
  res.json(lists);
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

module.exports = router;
