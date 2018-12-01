const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// a Storage class using ES6 class syntax
class Storage {
    constructor() {
        //configuring the AWS environment
        AWS.config.update({
          accessKeyId: process.env.AMAZON_ACCESS_KEY,
          secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY
        });

        var s3 = new AWS.S3();
    }

    upload( ) {
        var filePath = "./data/file.txt";

        //configuring parameters
        var params = {
          Bucket: process.env.AMAZON_BUCKET_NAME,
          Body : fs.createReadStream(filePath),
          Key : "folder/"+Date.now()+"_"+path.basename(filePath)
        };

        s3.upload(params, function (err, data) {
          //handle error
          if (err) {
            console.log("Error", err);
          }

          //success
          if (data) {
            console.log("Uploaded in:", data.Location);
            return data.Location;
          }
        });
    }
}

// exporting looks different from Node.js but is almost as simple
export {Storage};