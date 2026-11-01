const userModel = require('../../models/userModel')

async function updateUserController(req, res){
    try {
        const {userId, profilePic, firstName, lastName, socialLinks} = req.body
        if(!firstName) throw new Error("firstName not received")
        if(!lastName) throw new Error("lastName not received")
        
        // Prepare update object
        const updateData = {
            profilePic,
            firstName,
            lastName
        };

        // Handle social links - only include if they exist
        if (socialLinks) {
            updateData.socialLinks = {};
            if (socialLinks.facebookUrl !== undefined) {
                updateData.socialLinks.facebookUrl = socialLinks.facebookUrl || null;
            }
            if (socialLinks.instagramUrl !== undefined) {
                updateData.socialLinks.instagramUrl = socialLinks.instagramUrl || null;
            }
            if (socialLinks.twitterUrl !== undefined) {
                updateData.socialLinks.twitterUrl = socialLinks.twitterUrl || null;
            }
        }
        
        const update = await userModel.findByIdAndUpdate(
            userId, 
            updateData,
            { new: true }
        )

        res.status(200).json({
            message: "User data updated successfully",
            data: update,
            success: true, 
            error: false
        })
        
    } catch (err) {
        res.json({
            message:err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = updateUserController