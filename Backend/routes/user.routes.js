const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const user = require('../userSchema');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
router.use(express.json())
router.post('/login', async (req, res) => {
  try {
    let body = req.body;
    let u = await user.findOne({ email: body.email });
    if (await bcrypt.compare(body.password, u.password)) {
      const email = { name: body.email }
      console.log(username);
      const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
      res.json({
        message: 'Authentication Successful',
        accessToken: accessToken
      }).status(StatusCodes.ACCEPTED);
    } else {
      res.json({
        message: 'Authentication Failed'
      }).status(StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
    res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.log(process.env.MONGODB_URI);
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const u = new User({
      username: body.username,
      email: body.email,
      name: body.name,
      password: hashedPassword
    });
    await u.save();
    res.json({
      message: "User Created"
    }).status(StatusCodes.CREATED);
  } catch (error) {
    console.log(error);
    res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.patch('/update', async (req, res) => {
  try {
    const body = req.body;
    const u = await user.updateOne({
      email: body.email
    }, {
      $set: body
    });
    console.log(u);
    if (u.acknowledged) {
      res.send("Updated successfully").status(StatusCodes.OK);
    } else {
      res.send("Not Updated successfully").status(400);
    }
  } catch (error) {
    res.send(error.message).status(StatusCodes.BAD_REQUEST);
  }
});

//middleware to authenticate token
const authenticateToken = (req, res, next) => {
  console.log(req.headers);
  let token = req.headers.authorization;
  if (token == null) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
    }  else {
      req.user = user;
      next();
    }
  });
};

//added just for checking
router.get('/',authenticateToken,(req,res)=>{
  res.json({user : req.user})
})
module.exports = router;