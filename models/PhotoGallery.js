const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    // filename : {
    //     type : String,
    //     unique : true,
    //     required: true
    // },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('uploadImage', uploadSchema);