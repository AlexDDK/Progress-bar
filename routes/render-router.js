const router = require('express').Router();
const fetch = require('node-fetch');
// const isRegistered = require('../middlewares/isRegistered');
// const authorized = require('../middlewares/authorized');

router.get('/', (req, res) => {
  res.render('form');
});

router.get('/form/:link', async (req, res) => {
  const { link } = req.params;

  const response = await fetch('/db/linkId', {
    method: 'get',
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
