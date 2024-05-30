const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../schemas/userSchema');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { v4: uuidv4 } = require('uuid')
const userVerification = require('../schemas/userVerificationSchema')
const { StatusCodes } = require('http-status-codes');
const authenticateToken = require('../middleware/authenticateToken')
const router = express.Router();
router.use(express.json())
router.use(cookieParser())

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

router.post('/login', async (req, res) => {
  try {
    let body = req.body;
    let u = await user.findOne({ email: body.email });
    if (u === null) {
      return res.json({
        messsage: "Email is not registered",
        success: false
      }).status(StatusCodes.UNAUTHORIZED)
    }
    else if (!u.verified) {
      return res.json({
        messsage: "Email is not verified",
        success: false
      }).status(StatusCodes.UNAUTHORIZED)
    }
    else if (await bcrypt.compare(body.password, u.password)) {
      const email = { name: body.email }
      // console.log(email);
      const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
      res.cookie('accessToken', accessToken);
      return res.json({
        message: 'Authentication Successful',
        success: true
      }).status(StatusCodes.ACCEPTED);
    } else {
      return res.json({
        message: 'Authentication Failed',
        success: false
      }).status(StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
    return res.json({
      messsage: error.message,
      success: false
    }).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

const sendVerificationEmail = async ({ _id, email }, res) => {
  const currentURL = "http:localhost:4000/"
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email address to complete the signup and login into your account .< /p><p>This link <b>expires in 6 hours</b> .
      < /p><p>Press <a href=${currentURL + "verify/" + _id + "/" + uniqueString}>here</a> to proceed .< /p>`,
  }

  try {
    const hashedUniqueString = await bcrypt.hash(uniqueString, 10)
    // console.log(hashedUniqueString);
    const newUserVerification = new userVerification({
      uid: _id,
      uString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    })
    await newUserVerification.save()
    await transport.sendMail(mailOptions)
    return "mail sent!!"
  } catch (error) {
    return res.json({
      message: "Error at sending the email.",
      success: false
    }).status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const u = new user({
      username: body.username,
      email: body.email,
      name: body.name,
      password: hashedPassword,
      verified: false,
      img_count: 0
    });
    let response = await u.save();
    response = await sendVerificationEmail(response, res)
    return res.json({
      message: "User Created",
      success: true
    }).status(StatusCodes.CREATED);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // console.log();
      if (error.message.search("username") !== -1) {
        return res.json({
          message: "Username already exists",
          success: false
        }).status(StatusCodes.BAD_REQUEST)
      }
      else {
        return res.json({
          message: "Email exists",
          success: false
        }).status(StatusCodes.BAD_REQUEST)
      }
    }
    else {
      return res.json({
        message: error.message,
        success: false
      }).status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
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
    // console.log(u);
    if (u.acknowledged) {
      return res.json({
        message: "Updated successfully",
        success: true
      }).status(StatusCodes.OK);
    } else {
      return res.json({
        message: "Not Updated successfully",
        success: false
      }).status(400);
    }
  } catch (error) {
    return res.send(error.message).status(StatusCodes.BAD_REQUEST);
  }
});

//added just for checking
router.get('/', authenticateToken, (req, res) => {
  return res.json({
    user: req.user,
    success: true
  }).status(StatusCodes.OK)
})

router.post("/logout", authenticateToken, async (req, res) => {
  try {
    return res.clearCookie("accessToken").json({
      message: "Logged out successfully",
      success: true
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false
    }).status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router;