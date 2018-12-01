const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const Promise = require("bluebird");

// a Storage class
module.exports = class Storage {

    constructor() {
        //configuring the AWS environment
        AWS.config.update({
          accessKeyId: process.env.AMAZON_ACCESS_KEY,
          secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY
        });

        this.s3 = new AWS.S3();
    }

    upload( filePath, folder ) {
        //configuring parameters
        const params = {
          Bucket: process.env.AMAZON_BUCKET_NAME,
          Body : fs.createReadStream(filePath),
          Key : folder+"/"+path.basename(filePath),
          ACL : "public-read",
          ServerSideEncryption : "AES256",
          StorageClass : "STANDARD",
        };

        let uploadPromise = this.s3.upload(params).promise();

        return uploadPromise.then(function(data) {
          const base_url = "https://"+process.env.AMAZON_BUCKET_NAME;
          const location = base_url + "/" +folder+ "/"+path.basename(filePath);
          // console.log("Uploaded in:", location);
          return location;
        }).catch(function(err) {
          return err;
        });

        // this.s3.upload(params, function (err, data) {
        //   //handle error
        //   if (err) {
        //     console.log("Error", err);
        //   }

        //   //success
        //   if (data) {
        //     // return data.Location;
        //     const base_url = "https://"+process.env.AMAZON_BUCKET_NAME;
        //     const location = base_url + "/" +folder+ "/"+path.basename(filePath);
        //     console.log("Uploaded in:", location);
        //     return location;
        //   }
        // });
    }

    delete( filePath, folder ) {
        //configuring parameters
        const params = {
          Bucket: process.env.AMAZON_BUCKET_NAME,
          Key : folder+"/"+path.basename(filePath),
        };

        let deleteObjectPromise = this.s3.deleteObject(params).promise();

        return deleteObjectPromise.then(function(data) {
          return data;
        }).catch(function(err) {
          return err;
        });

        // this.s3.deleteObject(params, function (err, data) {
        //   //handle error
        //   if (err) {
        //     console.log("Error", err);
        //   }

        //   //success
        //   if (data) {
        //     // return data.Location;
        //     console.log("Deleted:", data);
        //     return data;
        //   }
        // });
    }
}
