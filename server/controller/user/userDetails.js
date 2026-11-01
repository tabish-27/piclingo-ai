const userModel = require('../../models/userModel')

async function userDetailsController(req, res){
    try {
        const userId =  req.query.userId; // More secure extraction
     
        if (!userId) {
            console.log("userId not found in userDetailsController");
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false
            });
        }

        console.log("userId received:", userId);

        const user = await userModel.findById(userId)
        // const user = await userModel.findById(req.body?.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }
        
        res.status(200).json({
            // data: req,
            data: user,
            message: "User details",
            error: false,
            success: true
        })
    } 
    catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userDetailsController