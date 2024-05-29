const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const sharp = require('sharp');
const AWS = require('aws-sdk');
const s3 = new AWS.S3()
const path = require('path');
const https = require('https');
const fs = require('fs');

function notDownloadImage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = [];

            res.on('data', (chunk) => {
                data.push(chunk);
            });

            res.on('end', () => {
                const buffer = Buffer.concat(data);
                resolve(buffer);
            });

            res.on('error', (err) => {
                console.error('Error downloading image:', err);
                reject(err);
            });
        }).on('error', (err) => {
            console.error('Error making HTTP request:', err);
            reject(err);
        });
    });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const fileStream = fs.createWriteStream(filepath);
            console.log(res);
            res.pipe(fileStream)
                .on('error', (err) => {
                    console.error('Error downloading image:', err);
                    reject(err);
                })
                .once('close', () => {
                    console.log('Image downloaded successfully!');
                    resolve();
                });
        }).on('error', (err) => {
            console.error('Error making HTTP request:', err);
            reject(err);
        });
    });
}

router.get('/:img', async (req, res) => {
    const img = req.params.img
    const { w, h, f } = req.query;

    try {
        // Fetch image from S3
        /*const params = {
            Bucket: 'opti-snap9574',
            Key: img
        };
        console.log("before aws call")
        const data = await s3.getObject(params).promise();
        let image = sharp(data.Body);
        if (w) image = image.resize(parseInt(w));
        if (h) image = image.resize({ height: parseInt(h) });
        if (f) image = image.toFormat(f);
        image.jpeg({ quality: 50 })
        const buffer = await image.toBuffer();
        res.type(`image/${f || 'jpeg'}`).send(buffer);*/

        // downloading
        /*const imageUrl = `https://opti-snap9574.s3.ap-south-1.amazonaws.com/${img}`;
        const filePath = `./uploads/${img}`;

        await downloadImage(imageUrl, filePath);

        const imagePath = path.join(__dirname, '../uploads', img);
        fs.readFile(imagePath, async (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send('Error processing image');
            }
            console.log("data read successfully");
            // Apply transformations
            const image = sharp(data);

            if (w) image = image.resize(parseInt(w));
            if (h) image = image.resize({ height: parseInt(h) });
            if (f) image = image.toFormat(f);
            image.jpeg({ quality: 50 })
            const buffer = await image.toBuffer();
            res.type(`image/${f || 'jpeg'}`).send(buffer);
        });*/

        //not downloading
        const imageUrl = `https://opti-snap9574.s3.ap-south-1.amazonaws.com/${img}`;
        const filePath = `./uploads/${img}`;
        let image = await notDownloadImage(imageUrl, filePath);
        image = sharp(image);

            if (w) image = image.resize(parseInt(w));
            if (h) image = image.resize({ height: parseInt(h) });
            if (f) image = image.toFormat(f);
            image.jpeg({ quality: 50 })
            const buffer = await image.toBuffer();
            res.type(`image/${f || 'jpeg'}`).send(buffer);

    } catch (err) {
        console.error("error: ", err);
        res.status(500).send('Error processing image');
    }
});

module.exports = router