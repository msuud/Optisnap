const express = require('express');
const jwt = require('jsonwebtoken')
const multer = require('multer')
// const user = require('../userSchema');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
router.use(express.json())

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

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        // console.log(req.file);
        //db needs to be upadated here and the image needs to be uploaded to aws s3 bucket
        res.send('File Uploaded successfully');
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
})

module.exports = router;