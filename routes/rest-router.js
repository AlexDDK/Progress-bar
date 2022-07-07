const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Checkbox, Form, User } = require('../db/models');

// router.get('/form', (req, res) => {
// });

router.post('/form', async (req, res) => {
  const { formOutput } = req.body;
  console.log(formOutput);
  try {
    const currCheckbox = await Checkbox.findOne({
      where: { link_id: 1 }, // change later
    });
    if (currCheckbox) {
      await Checkbox.update({
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
        link_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
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
        link_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(418);
  }
});

module.exports = router;
