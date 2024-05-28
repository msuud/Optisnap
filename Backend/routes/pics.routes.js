const express = require('express');
const fs = require('fs');
const path = require('path')
const user = require('../schemas/userSchema');
const authenticateToken = require('../middleware/authenticateToken')
// const user = require('../userSchema');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const upload = require('../middleware/multerMW')
router.use(express.json())


//config s3 object for aws
const AWS = require('aws-sdk');
const s3 = new AWS.S3()


router.post('/addWS', authenticateToken, async (req, res) => {
    try {
        const body = req.body;
        const newWorkspace = {
            name: body.workSpace,
            images: []
        };
        // console.log(newWorkspace);
        let r = await user.updateOne({ email: req.user.name }, { $push: { workspaces: newWorkspace } })
        // console.log(r);
        res.send("Workspace Added!").status(StatusCodes.OK)
    } catch (error) {
        res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})

router.post('/addPic', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const body = req.body;
        let x = await user.updateOne(
            { "workspaces.name": body.WSname },
            { $push: { "workspaces.$.images": req.file.originalname } }
        )
        console.log(x);
        res.send("Image added").status(StatusCodes.OK)

        //the image needs to be uploaded to aws s3 bucket
        const file = path.join('./uploads', req.file.originalname)
        let fileStream = fs.createReadStream(file);
        const uploadParam = {
            Bucket: "opti-scan9574",
            Key: path.basename(file),
            Body: fileStream
        }
        s3.upload(uploadParam, (err, data) => {
            if (err) {
                console.log("error : ", err);
                res.send("error: ", err.message).status(StatusCodes.INTERNAL_SERVER_ERROR)
            }
            else {
                // console.log(data.Location);
                res.send('File Uploaded successfully').status(StatusCodes.OK);
            }
        })

    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
})

router.get("/deleteWS/:WSname", authenticateToken, async (req, res) => {
    try {
        let WSname = req.params.WSname;
        let response = await user.updateOne({ email: req.user.name }, { $pull: { workspaces: { name: WSname } } })
        console.log(response);
        if (response.modifiedCount === 0) {
            res.send("Workspace not found").status(StatusCodes.NOT_FOUND)
        }else{
            res.send("Workspace deleted").status(StatusCodes.OK)
        }
    } catch (error) {
        res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})



router.get("/", authenticateToken, async (req, res) => {
    try {
        let u = await user.findOne({ email: req.user.name });
        console.log(u);
        res.json({ images: u.images }).status(StatusCodes.OK)
    } catch (error) {
        console.log("error", error);
        res.send(error.message)
    }
})

module.exports = router;