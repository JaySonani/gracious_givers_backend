const multer = require("multer");
const path = require("path");
//const shortid = require("shortid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);//
    },
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(new Error("You can upload only image files!"));
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

module.exports = upload


// const multer = require('multer');

// // set storage
// var storage = multer.diskStorage({
//     destination : function ( req , file , cb ){
//         cb(null, 'uploads')
//     },
//     filename : function (req, file , cb){
//         // image.jpg
//         var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

//         cb(null, file.fieldname + '-' + Date.now() + ext)
//     }
// })

// module.exports = store = multer({ storage : storage })