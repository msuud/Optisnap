const express = require("express");
const bcrypt = require("bcrypt");
const user = require("../schemas/userSchema");
const WS = require("../schemas/workspaceSchema");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const userVerification = require("../schemas/userVerificationSchema");
const { StatusCodes } = require("http-status-codes");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
router.use(express.json());
router.use(cookieParser());

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

router.post("/login", async (req, res) => {
  try {
    let body = req.body;
    let u = await user.findOne({ email: body.email });
    if (u === null) {
      return res
        .json({
          message: "Email is not registered",
          success: false,
        })
        .status(StatusCodes.UNAUTHORIZED);
    } else if (!u.verified) {
      return res
        .json({
          message: "Email is not verified",
          success: false,
        })
        .status(StatusCodes.UNAUTHORIZED);
    } else if (await bcrypt.compare(body.password, u.password)) {
      const id = { id: u._id };
      // console.log(email);
      const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
      res.cookie("accessToken", accessToken);
      return res
        .json({
          message: "Authentication Successful",
          success: true,
        })
        .status(StatusCodes.ACCEPTED);
    } else {
      return res
        .json({
          message: "Authentication Failed",
          success: false,
        })
        .status(StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

const sendVerificationEmail = async ({ _id, email }, res) => {
  const currentURL = "http:localhost:4000/";
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
    return res
      .json({
        message: "Error at sending the email.",
        success: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const u = new user({
      username: body.username,
      name: body.firstName + " " + body.lastName,
      name: body.firstName + " " + body.lastName,
      email: body.email,
      password: hashedPassword,
      verified: false,
      img_count: 0,
      recent: [],
      createdAt: Date.now(),
      lastModified: Date.now(),
    });
    await u.save();
    let response = await sendVerificationEmail(u, res);
    return res
      .json({
        message: `User Created , ${response}`,
        success: true,
      })
      .status(StatusCodes.CREATED);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // console.log();
      if (error.message.search("username") !== -1) {
        return res
          .json({
            message: "Username already exists",
            success: false,
          })
          .status(StatusCodes.BAD_REQUEST);
      } else {
        return res
          .json({
            message: "Email exists",
            success: false,
          })
          .status(StatusCodes.BAD_REQUEST);
      }
    } else {
      return res
        .json({
          message: error.message,
          success: false,
        })
        .status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
});

// needs to change but later
router.patch("/update", authenticateToken, async (req, res) => {
  try {
    const body = req.body;
    const u = await user.findByIdAndUpdate(req.user.id, {
      $set: {
        username: body.username,
        name: body.firstName + " " + body.lastName,
        lastModified: Date.now(),
      },
    });
    return res.json({
      message: "Updated successfully",
      success: true,
    });
  } catch (error) {
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

//added just for checking
router.get("/checkAuth", authenticateToken, (req, res) => {
  return res
    .json({
      message: "Authenticated successfully",
      success: true,
    })
    .status(StatusCodes.OK);
});

router.post("/logout", authenticateToken, async (req, res) => {
  try {
    return res.clearCookie("accessToken").json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    let u = await user
      .findById(req.user.id)
      .select("-id -password -recent -createdAt -lastModified -_v");
    // console.log(u);
    let WScount = await WS.find({ uid: u._id });
    u.WScount = WScount.length;
    return res
      .json({
        data: {
          username: u.username,
          firstName: u.name.split(" ")[0],
          lastName: u.name.split(" ")[1],
          WScount: u.WScount,
          img_count: u.img_count,
          email: u.email,
        },
        message: "data sent",
        success: true,
      })
      .status(StatusCodes.OK);
  } catch (error) {
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
