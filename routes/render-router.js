const router = require('express').Router();
const fetch = require('node-fetch');
// const isRegistered = require('../middlewares/isRegistered');
// const authorized = require('../middlewares/authorized');

router.get('/', (req, res) => {
  res.render('form');
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
