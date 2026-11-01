const userModel = require('../../models/userModel')

const incrementCaptionsGenerated = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { "statistics.captionGenerated": 5 } },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Captions generated count incremented",
            data: {
                captionGenerated: updatedUser.statistics.captionGenerated
            }
        })

    } catch (error) {
        console.error("Error incrementing captions generated:", error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = incrementCaptionsGenerated 