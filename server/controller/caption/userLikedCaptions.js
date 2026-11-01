const userModel = require('../../models/userModel')

async function userLikedCaptions(req, res){
    try {
        const { userId } = req.query

        const user = await userModel.findById(userId).populate({
            path: 'captionsLiked',
            model: 'SaveCaptions' // use actual model name
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Captions will be available as:
        const likedCaptions = user.captionsLiked;

        res.status(200).json({
            message: "Captions fetched successfully", 
            data: likedCaptions,
            success: true,
            error: false,
        })
    } catch (err) {
        res.json({
            message: err.message || err, 
            error: true,
            success: false
        })
    }
}

module.exports = userLikedCaptions