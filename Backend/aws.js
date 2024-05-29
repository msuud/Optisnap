// const AWS = require('aws-sdk');
// const s3 = new AWS.S3()

//for listing bucket
/*s3.listBuckets((err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
})*/

//for creating bucket
/*const bucketParam = { Bucket: "opti-scan9574" }

s3.createBucket(bucketParam, (err, data) => {
    if (err) { console.log(err); }
    else { console.log(data.Location); }
})*/

//for uploading file to bucket
/*let fs = require("fs");
const path = require('path')
const file = './picture/1331544.png'
let fileStream = fs.createReadStream(file);
const uploadParam = {
    Bucket: "opti-scan9574",
    Key: path.basename(file),
    Body: fileStream
}

s3.upload(uploadParam,(err,data)=>{
    if(err){console.log("error : ",err);}
    else{console.log(data.Location);}
})*/

//for listing objects the bucket
/*const bucketParams = {
    Bucket: "opti-scan9574",
};

s3.listObjects(bucketParams, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});*/


//for deleting an object
/*let params = {  Bucket: 'your bucket', Key: 'your object' };

s3.deleteObject(params, function(err, data) {
  if (err) console.log(err, err.stack);  // error
  else     console.log();                 // deleted
});*/

const fs = require('fs');
const https = require('https');

function downloadImage(url, filepath) {
  https.get(url, (res) => {
    res.pipe(fs.createWriteStream(filepath))
      .on('error', (err) => {
        console.error('Error downloading image:', err);
      })
      .once('close', () => console.log('Image downloaded successfully!'));
  });
}

const imageUrl = 'https://opti-snap9574.s3.ap-south-1.amazonaws.com/1323165.png';
const filePath = './uploads/downloaded_image.jpg';

downloadImage(imageUrl, filePath);