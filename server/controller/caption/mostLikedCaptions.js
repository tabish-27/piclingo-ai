const saveCaptionsModel = require("../../models/saveCaptionsModel")

async function mostLikedCaptions(req, res){
    try {
        const captions = await saveCaptionsModel.find()
        console.log('Found captions:', captions);
        
        res.status(200).json({
            data: captions,
            message: "Captions fetched successfully",
            success: true,
            error: false
        })
    } catch (err) {
        res.json({
            message: err.message || err, 
            error: true,
            success: false
        })
    }
}

module.exports = mostLikedCaptions