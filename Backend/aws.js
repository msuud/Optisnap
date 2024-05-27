const AWS = require('aws-sdk');
const s3 = new AWS.S3()

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

