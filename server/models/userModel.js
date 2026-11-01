const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    profilePic: {
        type: String,
    },

    captionsLiked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SaveCaptions'
    }],
    
    statistics:{
        uploadCount:{
            type:Number,
            default: 0
        },
        totalLikes:{
            type:Number,
            default: 0,
        },
        captionGenerated:{
            type:Number,
            default: 0,
        }
    },

    socialLinks:{
        instagramUrl: {
            type: String,
            validate: {
                validator: v => /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/.test(v),
                message: 'Invalid Instagram URL'
            }
        },
        twitterUrl: {
            type: String,
            validate: {
                validator: v => !v || /^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}\/?$/.test(v),
                message: 'Invalid Twitter URL'
            }
        },
        facebookUrl: {
            type: String,
            validate: {
                validator: v => !v || /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/.test(v),
                message: 'Invalid Facebook URL'
            }
        }
    },
    
    resetPasswordToken: String,
    resetPasswordExpires: String
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel