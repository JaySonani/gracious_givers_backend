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