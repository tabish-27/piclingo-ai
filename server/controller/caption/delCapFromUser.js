const saveCaptionsModel = require("../../models/saveCaptionsModel")
const userModel = require("../../models/userModel")
const { mongoose } = require("mongoose");

async function delCapFromUserController(req, res){
    try {
        const { userId, captionId } = req.query;

        if (!userId || !captionId) {
            return res.status(400).json({ 
                message: "userId and captionId are required", 
                success: false 
            });
        }
        
        // Remove captionId from user's captionsLiked array
        await userModel.findByIdAndUpdate(userId, {
            $pull: { captionsLiked: new mongoose.Types.ObjectId(captionId) }
        })

        // Remove userId from caption's likedUsers array and decrement likeCount
        await saveCaptionsModel.findByIdAndUpdate(captionId, {
            $pull: { likedUsers: new mongoose.Types.ObjectId(userId) },
            // $inc: { likeCount: -1 }
        })

        res.status(200).json({
            message: "Caption removed from user",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = delCapFromUserController