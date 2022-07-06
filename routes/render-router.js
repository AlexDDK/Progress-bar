const router = require('express').Router();
// const isRegistered = require('../middlewares/isRegistered');
// const authorized = require('../middlewares/authorized');

router.get('/', (req, res) => {
  res.render('form');
});
