const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

router.use(express.json());

router.post('/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      restPasswordToken: token,
      restPasswordExpries: { $gte: Date.now() },
    });

    if (!user) {
      return res.status(404).send({ message: 'Invalid Token' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.userhashedPassword = hashPassword;
    delete user.password;
    user.restPasswordToken = null;
    user.restPasswordExpries = null;

    await user.save();
    res.status(200).send({ message: 'Password Reset Successfully...' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
