const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 2* 24 * 60 * 60 * 1000), // 2 days
    }
}, { timestamps:true })
contactSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const contactModel = mongoose.model("Contact", contactSchema)
module.exports = contactModel