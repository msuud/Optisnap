const express = require("express");
const bcrypt = require("bcrypt");
const user = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const userVerification = require("../schemas/userVerificationSchema");
const { StatusCodes } = require("http-status-codes");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
const axios = require("axios");
router.use(express.json());

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // Use App Password if applicable
  },
});

router.post("/login", async (req, res) => {
  try {
    let body = req.body;
    let u = await user.findOne({ email: body.email });

    if (u == null) {
      res.send("Email is not registered").status(StatusCodes.UNAUTHORIZED);
    } else if (!u.verified) {
      res.send("Email is not verified").status(StatusCodes.UNAUTHORIZED);
    } else if (await bcrypt.compare(body.password, u.password)) {
      const email = { name: body.email };
      // console.log(email);
      const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res
        .json({
          message: "Authentication Successful",
        })
        .status(StatusCodes.ACCEPTED);
    } else {
      res
        .json({
          message: "Authentication Failed",
        })
        .status(StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
    res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

const sendVerificationEmail = async ({ _id, email }, res) => {
  const currentURL = "http://localhost:4000/";
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email address to complete the signup and login into your account .< /p><p>This link <b>expires in 6 hours</b> .
      < /p><p>Press <a href=${
        currentURL + "verify/" + _id + "/" + uniqueString
      }>here</a> to proceed .< /p>`,
  };

  try {
    const hashedUniqueString = await bcrypt.hash(uniqueString, 10);
    // console.log(hashedUniqueString);
    const newUserVerification = new userVerification({
      uid: _id,
      uString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    await newUserVerification.save();
    await transport.sendMail(mailOptions);
    return "mail sent!!";
  } catch (error) {
    res
      .send("Error at sending the email.")
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const u = new user({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      verified: false,
    });
    let response = await u.save();
    response = await sendVerificationEmail(response, res);
    res
      .json({
        message: "User Created",
        response: response,
      })
      .status(StatusCodes.CREATED);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // console.log();
      if (error.message.search("username") !== -1) {
        res.send("username exist").status(StatusCodes.BAD_REQUEST);
      } else {
        res.send("Email exists").status(StatusCodes.BAD_REQUEST);
      }
    } else {
      res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
});

router.patch("/update", async (req, res) => {
  try {
    const body = req.body;
    const u = await user.updateOne(
      {
        email: body.email,
      },
      {
        $set: body,
      }
    );
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

//added just for checking
router.get("/", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});
module.exports = router;

router.post("/logout", authenticateToken, async (req, res) => {
  try {
    await user.findOneAndDelete({ email: res.user.name });
    res.json({ message: "Logged Out" }).status(StatusCodes.OK);
  } catch (error) {
    res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
