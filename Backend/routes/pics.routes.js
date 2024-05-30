const express = require('express');
const user = require('../schemas/userSchema');
const WS = require('../schemas/workspaceSchema')
const authenticateToken = require('../middleware/authenticateToken')
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const upload = require('../middleware/multerMW')
router.use(express.json())


//config s3 object for aws
const AWS = require('aws-sdk');
const s3 = new AWS.S3()


//working
router.post('/addWS', authenticateToken, async (req, res) => {
    try {
        const body = req.body;
        let ws = new WS({
            name: body.name,
            uid: req.user.id,
            images: [],
        })
        await ws.save()
        return res.json({
            message: "Workspace Added!",
            sucess: true
        }).status(StatusCodes.OK)
    } catch (error) {
        return res.json({
            message: error.message,
            sucess: false
        }).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})

//needs change is size in newImage object and 
//need to delete after sending to bucket or failure 
//need to change the format of date
//but working
router.post('/addPic', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const body = req.body;
        const newImage = {
            name: req.file.originalname,
            uploadedAt: Date.now(),
            // size: value
        }
        let x = await WS.updateOne(
            { name: body.WSname },
            { $push: { images: newImage } }
        )
        // console.log(x);
        if (x.modifiedCount > 0) {
            const user1 = await user.findOneAndUpdate({ _id: req.user.id }, { $inc: { img_count: 1 } })
            user1.recent.push(newImage); // Add image name directly to the array (modification tracked)
            if (user1.recent.length > 5) {
                user1.recent.shift(); // Remove the last element if exceeding 10
            }
            await user1.save();
            return res.json({
                message: "Image Uploaded Successfully!",
                sucess: true
            }).status(StatusCodes.OK)
        }
        else {
            return res.json({
                message: "Image Upload Failed!",
                sucess: false
            }).status(StatusCodes.INTERNAL_SERVER_ERROR)
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
        //         res.json({
        //             message: "Image Upload Failed!",
        //             sucess: false
        //         }).status(StatusCodes.INTERNAL_SERVER_ERROR)
        //     }
        //     else {
        //         // console.log(data.Location);
        //         return res.json({
        //             message: "Image Uploaded Successfully!",
        //             sucess: true
        //         }).status(StatusCodes.OK);
        //     }
        // })

    } catch (error) {
        console.log(error);
        return res.json({
            message: error.message,
            success: false
        }).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})

router.get("/deleteWS/:WSname", authenticateToken, async (req, res) => {
    try {
        let WSname = req.params.WSname;
        let ws = await WS.findOne({ name: WSname });
        // console.log(ws);
        if (ws.images.length !== 0) {
            return res.json({
                message: "Please empty the WorkSpace before deleting",
                success: false
            })
        }
        else {
            // needs to check
            let response = await WS.findOneAndDelete({ name: WSname })
            // if(response)
            return res.json({
                message: "WorskSpace deleted",
                success: true
            })
        }
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        }).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})


// needs to change
// router.get("/", authenticateToken, async (req, res) => {
//     try {
//         let u = await user.findOne({ _id: req.user.id });
//         console.log(u);
//         return res.json({
//             message: "authorized user",
//             success: true
//         }).status(StatusCodes.OK)
//     } catch (error) {
//         console.log("error", error);
//         return res.send(error.message)
//     }
// })

//working
router.get("/dashboard", authenticateToken, async (req, res) => {
    try {
        let u = await user.findOne({ _id: req.user.id }, {
            username: 1,
            img_count: 1,
            recent: 1
        });
        let WScount = await WS.find({ uid: u._id });
        let rev = u.recent
        rev.reverse()
        console.log(rev);
        return res.json({
            message: "Data sent",
            data: {
                username: u.username,
                noOfWS: WScount.length,
                noOfImg: u.img_count,
                recent: rev
            },
            success: true
        });
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
})

//working
router.get("/workspace", authenticateToken, async (req, res) => {
    try {
        let response = await WS.find({ uid: req.user.id }).select("-_id -uid -__v")
        return res.json({
            message: "data sent",
            data: response,
            sucess: true
        })
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
})

//working
router.get("/workspace/:WSname", authenticateToken, async (req, res) => {
    try {
        let WSname = req.params.WSname
        let response = await WS.findOne({ uid: req.user.id, name: WSname }).select("-_id -uid -__v")
        return res.json({
            message: "data sent",
            data: response,
            sucess: true
        })
    } catch (error) {
        return res.send(error.message).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})

//working
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        let u = await user.findById(req.user.id, {
            username: 1,
            email: 1,
            img_count: 1
        })
        let WScount = await WS.find({ uid: u._id });
        // console.log(u);
        return res.json({
            username: u.username,
            email: u.email,
            WScount: WScount.length,
            img_count: u.img_count
        })
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        }).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
})
/*
1) /dashboard : username,no of WS and images (done)
2) /workspace : name of WS and no of images (done)
3) /workspace/:WSname : all names of images (done)
4) /profile : all details of user (done)
*/

module.exports = router;