# RezTechProCDN


```bash
AMAZON_ACCESS_KEY=###################### AMAZON_SECRET_ACCESS_KEY=###################### AMAZON_BUCKET_NAME=###################### nodemon tests/app.js -L
```

## Upload Method

```javascript
// upload ( filePath, folder )
storage.upload( "./data/file.txt","data")
.then((location)=>{
  console.log("Finished Upload: "+location);
})
.catch(function(err) {
  console.log(err);
});
```

## Delete Method

```javascript
// Delete ( filename, folder)
storage.delete( "file.txt","data")
.then((data)=>{
  console.log("Deleted: "+data.VersionId);
})
.catch(function(err) {
  console.log(err);
});
```

## Promise.all() Method

```javascript
const uploadObject = () => {
	return storage.upload( "./data/file.txt","data");
};

const deleteObject = () => {
	return storage.delete( "file.txt","data");
};

Promise.all([
    uploadObject(),
    deleteObject(),
])
.then(([location, data]) => {
    // ···
    console.log("Finished Upload: "+location);
    console.log("Deleted: "+data.VersionId);
})
.catch(err => {
    // Receives first rejection among the Promises
    console.log(err);
});
```