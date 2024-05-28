const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const sharp = require('sharp');
const AWS = require('aws-sdk');
const s3 = new AWS.S3()
const path = require('path');
const fs = require('fs').promises; 

router.get('/:img', async (req, res) => {
    const img = req.params.img
    const { w, h, f } = req.query;

    try {
        // Fetch image from S3
        // const params = {
        //     Bucket: 'opti-snap9574',
        //     Key: img
        // };
        // console.log("before aws call")
        // const data = await s3.getObject(params).promise();
        // let image = sharp(data.Body);

        const imagePath = path.resolve(__dirname, '../uploads', img);
        const data = await fs.readFile(imagePath);
        // Apply transformations
        let image = sharp(data)

        if (w) image = image.resize(parseInt(w));
        if (h) image = image.resize({ height: parseInt(h) });
        if (f) image = image.toFormat(f);
        image.jpeg({quality:50})
        console.log("before send image");
        const buffer = await image.toBuffer();
        res.type(`image/${f || 'jpeg'}`).send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing image');
    }
});

module.exports = router