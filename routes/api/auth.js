const express = require('express');
const router = express.Router();
const auth  = require('../../middleware/auth');
const User  = require('../../models/User');
const config= require('config');
const jwt   = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @ route-> GET api/auth
// @desc -> -> Test Route
// @access -> Public atau Private

router.get('/', auth, async (req, res) => {
  try {
    const user  = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route-> POST api/auth
// @desc -> -> Test Route
// @access -> Public
router.post('/', [
  check('email' , 'Isi dengan valid Email').isEmail(),
  check('password','Password harus di isi').exists()
], 
// menggunakan promise async/await
async(req, res) => {
  // handle request
  const errors  = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  // membuat variable menggunakan destructure
  const { email, password } = req.body;

  // membuat try catch
  try {
    let user = await User.findOne({ email })
    // user exis
    if (!user) {
      return res.status(400).json({error : [{msg: "User Invalid"}] });
    }

    // Compare password bawaan bcryptjs
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json ({error : [{msg: "User Invalid"}] });
    }

    // Return jsonwebtoken
    const payload = {
      user : {
        id: user.id
      }
    };
    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      {expiresIn: 360000},
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    )

  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }

  // res.send('User Route');
});

//export route
module.exports = router;