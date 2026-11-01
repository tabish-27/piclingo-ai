const userModel = require('../../models/userModel')

const updateUploadCount = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            })
        }

        // Find user and increment uploadCount
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $inc: { 
                    "statistics.uploadCount": 1,  
                    "statistics.captionGenerated": 5
                } 
            },
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
            message: "Upload count updated successfully",
            data: {
                uploadCount: updatedUser.statistics.uploadCount
            }
        })

    } catch (error) {
        console.error("Error updating upload count:", error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = updateUploadCount 