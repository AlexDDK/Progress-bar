const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Checkbox, Form, User } = require('../db/models');

router.get('/form/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const currCheckbox = await Checkbox.findOne({
      where: { link_id: id },
    });

    res.json(currCheckbox).status(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/form', async (req, res) => {
  const { formOutput } = req.body;
  console.log(formOutput);
  try {
    const currCheckbox = await Checkbox.findOne({
      where: { link_id: 1 }, // change later
    });
    if (currCheckbox) {
      try {
        await Checkbox.update(
          {
            q1: formOutput.checkbox1,
            q2: formOutput.checkbox2,
            q3: formOutput.checkbox3,
            q4: formOutput.checkbox4,
            q5: formOutput.checkbox5,
            q6: formOutput.checkbox6,
            q7: formOutput.checkbox7,
            q8: formOutput.checkbox8,
            q9: formOutput.checkbox9,
            q10: formOutput.checkbox10,
            q11: formOutput.checkbox11,
            q12: formOutput.checkbox12,
            q8_Str: formOutput.names,
            updatedAt: new Date(),
          },
          {
            where: { link_id: 1 }, // change later
          },
        );
      } catch (error) {
        console.log(error, 'update error');
      }
    } else {
      try {
        await Checkbox.create({
          q1: formOutput.checkbox1,
          q2: formOutput.checkbox2,
          q3: formOutput.checkbox3,
          q4: formOutput.checkbox4,
          q5: formOutput.checkbox5,
          q6: formOutput.checkbox6,
          q7: formOutput.checkbox7,
          q8: formOutput.checkbox8,
          q9: formOutput.checkbox9,
          q10: formOutput.checkbox10,
          q11: formOutput.checkbox11,
          q12: formOutput.checkbox12,
          q8_Str: formOutput.names,
          link_id: 1, // change later
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.log(error, 'create error');
      }
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(418);
  }
});

router.get('/allforms', async (req, res) => {
  const allforms = await Form.findAll();
  res.json({ allforms });
});

router.get('/myforms', async (req, res) => {
  const myforms = await Form.findAll({ where: { creator_id: res.locals.userId } });
  res.json({ myforms });
});

router.get('/allusers', async (req, res) => {
  const allusers = await User.findAll();
  res.json({ allusers });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
	res.clearCookie('user_sid');
  res.redirect('/');
});

module.exports = router;
