const mongoose = require('mongoose')

const saveCaptionSchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true
    },
    likeCount:{
        type: Number,
        required: true,
        default: 1,
    },
    tags:[{     //array with index
        type: String,
        index: true
    }],
    likedUsers:[{
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId here if user IDs are ObjectIds
        ref: 'User'
    }]
}, {timestamps: true})

const saveCaptionsModel = mongoose.model("SaveCaptions", saveCaptionSchema)
module.exports = saveCaptionsModel