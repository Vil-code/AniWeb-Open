const express = require('express');
const User = require('../models/User');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config();

router.post('/', async (req, res, next) => {

  try {
    const body = req.body;
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
   
    return res.status(200).send({ token: token, username: user.username, user_id: user._id })
  } catch (e) {
    next(e)
  }

});

module.exports = router;

