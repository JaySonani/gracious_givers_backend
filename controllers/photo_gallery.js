// Author: Viraj Jigar Shah (B00879448)

const photoGallery = require("../models/PhotoGallery");
const { IMAGE_BASE_URL } = require('../middleware/config');

exports.home = async (req, res) => {

    try {
        console.log('finally!! HOME')
        const all_images = await photoGallery.find()
        console.log(all_images)

        return res.status(200).json(all_images)
    }// res.render('main', { images : all_images });
    catch (err) {
        console.log(err);
        const errorMessage = {
            message: err,
            success: false,
        };
        response.status(500).send(errorMessage);
    }
};

// exports.editImages = async (req, res) => {

//     try {
//         console.log('finally!! EDIT ')
//         const all_images = await photoGallery.find()
//         console.log(all_images)

//         return res.status(200).json(all_images)
//         // res.render('main', { images : all_images });
//     } catch (err) {
//         console.log(err);
//         const errorMessage = {
//             message: err,
//             success: false,
//         };
//         response.status(500).send(errorMessage);
//     }
// }

exports.deleteImages = async (req, res, next) => {
    try {
        console.log('finally!! DELETE')
        // console.log(req.body.desc)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        console.log('===============id=====================')
        const id = req.body.event
        console.log(req.body)
        console.log(id)
        console.log('===============id=====================')

        photoGallery.deleteOne({ _id: id }, function (err) {
            //if (err) return handleError(err);
            if (err) {
                var error = 'Something bad happened, try again!';
                if (err.code === 11000) {
                    error = 'That email is already taken, try another.';
                }
                //res.render('register.jade', { error: error });
            }
            else {
                console.log('deleted')
            }
        });
    } catch (e) {
        console.log(e);
    }
}

exports.uploads = async (req, res, next) => {
    try {
        console.log('finally!! UPLOADS')
        // console.log(req.body.desc)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        //console.log(res)

        console.log(req.body.NGOStory)
        console.log(req.body.filename)
        console.log(req.file)
        console.log(req.file.filename)

        const description = req.body.desc;
        //console.log('finally!!')
        ///console.log(req.file.path)
        // const imagePath = `${IMAGE_BASE_URL}/${req.file.filename}`
        const imagePath = `${IMAGE_BASE_URL}/${req.file.filename}`
        console.log(imagePath)
        const imgObj = {
            description: description,
            image: imagePath
        }
        photoGallery.create(imgObj).then((img) => {
            console.log(img)
            return res.json(img)
        }).catch(err => {
            console.log(err)
        })
    }
    catch (e) {
        console.log(e);
    }
}
