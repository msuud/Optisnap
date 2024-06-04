const express = require("express");
const user = require("../schemas/userSchema");
const WS = require("../schemas/workspaceSchema");
const authenticateToken = require("../middleware/authenticateToken");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const upload = require("../middleware/multerMW");
const fs = require("fs");
const path = require("path");
router.use(express.json());

//config s3 object for aws
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

//working
router.post("/addWS", authenticateToken, async (req, res) => {
  try {
    const body = req.body;
    let ws = new WS({
      name: body.name,
      uid: req.user.id,
      images: [],
    });
    await ws.save();
    return res
      .json({
        message: "Workspace Added!",
        sucess: true,
      })
      .status(StatusCodes.OK);
  } catch (error) {
    return res
      .json({
        message: error.message,
        sucess: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

//working
router.post(
  "/addPic",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log(req.body);
      const body = req.body;
      const time = new Date();
      const sizeInMB = req.file.size / (1024 * 1024);

      // console.log(Image size: ${ sizeInMB.toFixed(2) } MB);

      const newImage = {
        name: req.file.originalname,
        uploadedAt: time,
        size: sizeInMB.toFixed(2),
      };
      let x = await WS.updateOne(
        { name: body.WSname },
        { $push: { images: newImage } }
      );
      // console.log(x);
      if (x.modifiedCount > 0) {
        const user1 = await user.findOneAndUpdate(
          { _id: req.user.id },
          { $inc: { img_count: 1 } }
        );
        user1.recent.push(newImage);
        if (user1.recent.length > 5) {
          user1.recent.shift();
        }
        await user1.save();

        // the image needs to be uploaded to aws s3 bucket
        const file = path.join("./uploads", req.file.originalname);
        let fileStream = fs.createReadStream(file);
        const uploadParam = {
          Bucket: "opti-snap9574",
          Key: path.basename(file),
          Body: fileStream,
        };
        s3.upload(uploadParam, (err, data) => {
          if (err) {
            console.log("error : ", err);
            return res
              .json({
                message: "Image Upload Failed!",
                sucess: false,
              })
              .status(StatusCodes.INTERNAL_SERVER_ERROR);
          } else {
            // console.log(data.Location);
            return res
              .json({
                message: "Image Uploaded Successfully!",
                success: true,
              })
              .status(StatusCodes.OK);
          }
        });
      } else {
        return res
          .json({
            message: "Image Upload Failed!",
            sucess: false,
          })
          .status(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      console.log(error);
      return res
        .json({
          message: error.message,
          success: false,
        })
        .status(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
      let filePath = path.join(__dirname, "../uploads", req.file.originalname);
      fs.rm(filePath, (error) => {
        if (error) console.log(error);
      });
    }
  }
);

router.get("/deleteWS/:WSname", authenticateToken, async (req, res) => {
  try {
    let WSname = req.params.WSname;
    let ws = await WS.findOne({ name: WSname });
    // console.log(ws);
    if (ws.images.length !== 0) {
      return res.json({
        message: "Please empty the WorkSpace before deleting",
        success: false,
      });
    } else {
      // needs to check
      let response = await WS.findOneAndDelete({ name: WSname });
      // if(response)
      return res.json({
        message: "WorskSpace deleted",
        success: true,
      });
    }
  } catch (error) {
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.delete(
  "/delPic/:WSname/:picName",
  authenticateToken,
  async (req, res) => {
    try {
      const WSname = req.params.WSname;
      const picName = req.params.picName;
      let ws = await WS.findOne({ name: WSname });
      ws.images = ws.images.filter((image) => image.name !== picName);
      await ws.save();
      let user1 = await user.findById(req.user.id);
      user1.recent = user1.recent.filter((image) => image.name !== picName);
      user1.img_count = user1.img_count - 1;
      await user1.save();
      let params = { Bucket: "opti-snap9574", Key: picName };

      s3.deleteObject(params, function (err, data) {
        if (err) {
          return res.json({
            message: error.message,
            success: false,
          });
        } else {
          return res.json({
            message: "image deleted",
            success: true,
          });
        }
      });
    } catch (error) {
      return res.json({
        message: error.message,
        success: false,
      });
    }
  }
);

router.patch("/editWS", authenticateToken, async (req, res) => {
  try {
    let body = req.body;
    let response = await WS.updateOne(
      { uid: req.user.id, name: body.name },
      { $set: { name: body.newName } }
    );
    if (response.modifiedCount > 0) {
      return res
        .json({
          message: "WorkSpace updated",
          success: true,
        })
        .status(StatusCodes.OK);
    } else {
      return res
        .json({
          message: "Workspace name not found",
          success: false,
        })
        .status(StatusCodes.BAD_REQUEST);
    }
  } catch (error) {
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

//working
//might need change with the data
router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    let u = await user.findOne(
      { _id: req.user.id },
      {
        username: 1,
        img_count: 1,
        recent: 1,
      }
    );
    let WScount = await WS.find({ uid: u._id });
    let rev = u.recent;
    rev.reverse();
    // console.log(rev);
    return res.json({
      message: "Data sent",
      data: {
        username: u.username,
        noOfWS: WScount.length,
        noOfImg: u.img_count,
        recent: rev,
      },
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
});

//working
router.get("/workspace", authenticateToken, async (req, res) => {
  try {
    let response = await WS.find({ uid: req.user.id }).select("-id -uid -_v");
    return res.json({
      message: "data sent",
      data: response,
      sucess: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
});

//working
router.get("/workspace/:WSname", authenticateToken, async (req, res) => {
  try {
    let WSname = req.params.WSname;
    let response = await WS.findOne({ uid: req.user.id, name: WSname }).select(
      "-id -uid -_v"
    );
    return res.json({
      message: "data sent",
      data: response,
      sucess: true,
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

//working
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    let u = await user.findById(req.user.id, {
      username: 1,
      email: 1,
      img_count: 1,
    });
    let WScount = await WS.find({ uid: u._id });
    // console.log(u);
    return res.json({
      username: u.username,
      email: u.email,
      WScount: WScount.length,
      img_count: u.img_count,
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

module.exports = router;
