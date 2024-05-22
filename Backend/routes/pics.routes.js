const express = require('express');
const multer = require('multer')
const fs = require('fs');
const path = require('path')
const user = require('../userSchema');
const authenticateToken = require('./authenticateToken')
// const user = require('../userSchema');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
router.use(express.json())

//config multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for uploads (e.g., 'uploads/')
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        // Use the original filename provided by the user
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//config s3 object for aws
const AWS = require('aws-sdk');
const s3 = new AWS.S3()

router.post('/add', [upload.single('image'), authenticateToken], async (req, res) => {
    try {
        await user.updateOne({ email: req.user.name }, { $push: { images: req.file.originalname } })
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

module.exports = router;