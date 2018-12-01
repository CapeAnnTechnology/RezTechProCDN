// const Promise = require("bluebird");
const Storage = require('../index');

let storage = new Storage();

// upload ( filePath, folder )
storage.upload( "./data/file.txt","5b36b0b3d4fbb1070044790a").then((location)=>{
  console.log("Finished Upload: "+location);
})
.then(()=>{
  // Delete ( filename, folder)
  storage.delete( "file.txt","5b36b0b3d4fbb1070044790a").then((data)=>{
    console.log("Deleted: "+data.VersionId);
  }).catch(function(err) {
    console.log(err);
  });

})
.catch(function(err) {
  console.log(err);
});


// Promise Functions

const uploadObject = () => {
	return storage.upload( "./data/file.txt","5b36b0b3d4fbb1070044790a");
};

const deleteObject = () => {
	return storage.delete( "file.txt","5b36b0b3d4fbb1070044790a");
};

// Promise.all([
//     uploadObject(),
//     deleteObject(),
// ])
// .then(([location, data]) => {
//     // ···
//     console.log("Finished Upload: "+location);
//     console.log("Deleted: "+data.VersionId);
// })
// .catch(err => {
//     // Receives first rejection among the Promises
//     console.log(err);
// });