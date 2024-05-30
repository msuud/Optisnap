const express = require("express");
const fs = require("fs");
const path = require("path");
const user = require("../schemas/userSchema");
const authenticateToken = require("../middleware/authenticateToken");
// const user = require('../userSchema');
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const upload = require("../middleware/multerMW");
router.use(express.json());

//config s3 object for aws
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

router.post("/addWS", authenticateToken, async (req, res) => {
  try {
    const body = req.body;
    const newWorkspace = {
      name: body.workSpace,
      images: [],
    };
    // console.log(newWorkspace);
    let r = await user.updateOne(
      { email: req.user.name },
      {
        $push: { workspaces: newWorkspace },
      }
    );
    // console.log(r);
    res.send("Workspace Added!").status(StatusCodes.OK);
  } catch (error) {
    res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.post(
  "/addPic",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const body = req.body;
      let now = new Date();
      const newImage = {
        name: req.file.originalname,
        uploadedAt: now,
      };
      let x = await user.updateOne(
        { "workspaces.name": body.WSname },
        { $push: { "workspaces.$.images": newImage } }
      );
      // console.log(x);
      if (x.modifiedCount > 0) {
        const user1 = await user.findOneAndUpdate(
          { email: req.user.name },
          { $inc: { img_count: 1 } }
        );
        user1.recent_10.push(newImage); // Add image name directly to the array (modification tracked)

        if (user1.recent_10.length > 10) {
          user1.recent_10.shift(); // Remove the last element if exceeding 10
        }
        await user1.save();

        user1.img_count = user1.recent_10.length;
        res.send("Image added successfully");
      } else {
        res
          .send("Workspace not found")
          .status(StatusCodes.INTERNAL_SERVER_ERROR);
      }

      // // the image needs to be uploaded to aws s3 bucket
      // const file = path.join('./uploads', req.file.originalname)
      // let fileStream = fs.createReadStream(file);
      // const uploadParam = {
      //     Bucket: "opti-scan9574",
      //     Key: path.basename(file),
      //     Body: fileStream
      // }
      // s3.upload(uploadParam, (err, data) => {
      //     if (err) {
      //         console.log("error : ", err);
      //         res.send("error: ", err.message).status(StatusCodes.INTERNAL_SERVER_ERROR)
      //     }
      //     else {
      //         // console.log(data.Location);
      //         res.send('File Uploaded successfully').status(StatusCodes.OK);
      //     }
      // })
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
);

router.get("/deleteWS/:WSname", authenticateToken, async (req, res) => {
  try {
    let WSname = req.params.WSname;
    let response = await user.updateOne(
      { email: req.user.name },
      {
        $pull: { workspaces: { name: WSname } },
      }
    );
    console.log(response);
    if (response.modifiedCount === 0) {
      res.send("Workspace not found").status(StatusCodes.NOT_FOUND);
    } else {
      res.send("Workspace deleted").status(StatusCodes.OK);
    }
  } catch (error) {
    res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    let u = await user.findOne({ email: req.user.name });
    console.log(u);
    res.json({ images: u.images }).status(StatusCodes.OK);
  } catch (error) {
    console.log("error", error);
    res.send(error.message);
  }
});

router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    let u = await user.findOne(
      { email: req.user.name },
      {
        username: 1,
        img_count: 1,
        workspaces: 1,
        recent_10: 1,
      }
    );
    let r10 = u.recent_10;
    r10.reverse();
    console.log(r10);
    res.json({
      username: u.username,
      noOfWS: u.workspaces.length,
      noOfImg: u.img_count,
      recent_10: r10,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/workspace", authenticateToken, async (req, res) => {
  let u = await user.findOne({ email: req.user.name }, { workspaces: 1 });
  res.json({ data: u.workspaces });
});

router.get("/workspace/:WSname", authenticateToken, async (req, res) => {
  try {
    let u = await user.findOne({ email: req.user.name }, { workspaces: 1 });
    let ws = u.workspaces.find((ws) => ws.name === req.params.WSname);
    if (ws) {
      res.json({ data: ws }).status(StatusCodes.OK);
    } else {
      res.send("Workspace not found").status(StatusCodes.NOT_FOUND);
    }
  } catch (error) {
    res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    let u = await user.findOne(
      { email: req.user.name },
      {
        username: 1,
        email: 1,
        workspaces: 1,
        img_count: 1,
      }
    );
    // console.log(u);
    res.json({
      username: u.username,
      email: u.email,
      WScount: u.workspaces.length,
      img_count: u.img_count,
    });
  } catch (error) {
    res.send(error).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
/*
1) /dashboard : username,no of WS and images (done)
2) /workspace : name of WS and no of images (done)
3) /workspace/:WSname : all names of images (done)
4) /profile : all details of user (done)
*/

module.exports = router;
