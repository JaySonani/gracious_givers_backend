const photo_gallery = require("../models/FundraiserStory");

exports.home = async (req, res) => {

    try {
        console.log('finally!!')
        const all_images = await photo_gallery.find()
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

exports.editImages = async (req, res) => {

    try {
        console.log('finally!!')
        const all_images = await UploadModel.find()
        console.log(all_images)

        return res.status(200).json(all_images)
        // res.render('main', { images : all_images });
    } catch (err) {
        console.log(err);
        const errorMessage = {
            message: err,
            success: false,
        };
        response.status(500).send(errorMessage);
    }
}

exports.deleteImages = async (req, res, next) => {
    try {
        // console.log(req.body.desc)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        console.log('===============id=====================')
        const id = req.body.event
        console.log(id)
        console.log('===============id=====================')

        UploadModel.deleteOne({ _id: id }, function (err) {
            //if (err) return handleError(err);
            if (err) {
                var error = 'Something bad happened, try again!';
                if (err.code === 11000) {
                    error = 'That email is already taken, try another.';
                }
                //res.render('register.jade', { error: error });
            }
        });
    } catch (e) {
        console.log(e);
    }
}

exports.uploads = async (req, res, next) => {
    try {
        // console.log(req.body.desc)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        //console.log(res)


        const description = req.body.desc;
        //console.log('finally!!')
        ///console.log(req.file.path)
        const imagePath = `${IMAGE_BASE_URL}/${req.file.filename}`
        console.log(imagePath)
        const imgObj = {
            description: description,
            image: imagePath
        }
        UploadModel.create(imgObj).then((img) => {
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
