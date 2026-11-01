const userModel = require("../../models/userModel");

async function incrementTotalLikesController(req, res) {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({
                message: "UserId is required",
                success: false,
                error: true
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $inc: {
                    'statistics.totalLikes': 1
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        res.status(200).json({
            message: "Total likes incremented successfully",
            data: {
                totalLikes: updatedUser.statistics.totalLikes
            },
            success: true,
            error: false
        });

    } catch (error) {
        console.error("Error incrementing total likes:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: true
        });
    }
}

module.exports = incrementTotalLikesController; 