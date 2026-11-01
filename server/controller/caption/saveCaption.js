const saveCaptionsModel = require("../../models/saveCaptionsModel");
const userModel = require("../../models/userModel");

async function saveCaptionController(req, res) {
    try {
        const { caption, userId, tags = [] } = req.body;
        console.log("caption: ", caption, "userId:", userId, "tags", tags)
        if (!caption || !userId) throw new Error("Caption or userId not received");

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        // Check if caption already exists
        let captionDoc = await saveCaptionsModel.findOne({ caption });

        if (!captionDoc) {
            // Caption not in DB → create and save with likeCount 1
            captionDoc = await saveCaptionsModel.create({
                caption,
                likeCount: 1,
                tags,
                likedUsers: [userId],
            });

            // Add to user's liked captions
            await userModel.findByIdAndUpdate(userId, {
                $push: {
                    captionsLiked: {
                        $each: [captionDoc._id],
                        $position: 0,
                        $slice: 50,
                    },
                },
            });

            return res.status(201).json({
                message: "New caption saved and liked",
                data: captionDoc,
                success: true,
                error: false,
            });
        }

        // If already liked by this user, skip
        if (user.captionsLiked.includes(captionDoc._id)) {
            return res.status(200).json({
                message: "Caption already liked by user",
                data: captionDoc,
                success: true,
                error: false,
            });
        }

        // Else update likeCount and likedUsers
        const updated = await saveCaptionsModel.findByIdAndUpdate(
            captionDoc._id,
            {
                $inc: { likeCount: 1 },
                $addToSet: { likedUsers: userId },
            },
            { new: true }
        );

        await userModel.findByIdAndUpdate(userId, {
            $push: {
                captionsLiked: {
                    $each: [updated._id],
                    $position: 0,
                    $slice: 50,
                },
            },
        });

        return res.status(200).json({
            message: "Caption like count updated",
            data: updated,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = saveCaptionController





// async function saveCaptionController(req, res){
//     try {
//         const {caption, userId} = req.body
//         console.log("cap received: ", caption)
//         if(!caption || !userId) throw new Error("Caption or userId not received")
        
//         // Check if user has already liked this caption
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false,
//                 error: true
//             });
//         }

//         // Find the caption in the database
//         const exists = await saveCaptionsModel.findOne( {caption} )
//         if (!exists) {
//             return res.status(404).json({
//                 message: "Caption not found",
//                 success: false,
//                 error: true
//             });
//         }

//         // Check if user has already liked this caption
//         if (user.captionsLiked.includes(exists._id)) {
//             return res.status(200).json({
//                 message: "Caption already liked by user",
//                 data: exists,
//                 success: true,
//                 error: false
//             });
//         }

//         // Update the caption's like count and add user to likedUsers
//         const updated = await saveCaptionsModel.findByIdAndUpdate(
//             exists._id, 
//             { 
//                 $inc: { likeCount: 1}, 
//                 $addToSet: {likedUsers: userId},
//             },
//             { new : true }
//         )

//         // Update user's captionsLiked array (most recent 50 only)
//         await userModel.findByIdAndUpdate(userId, {
//             $push: {
//                 captionsLiked: {
//                     $each: [updated._id],
//                     $position: 0,
//                     $slice: 50
//                 }
//             }
//         })

//         return res.status(200).json({
//             message: "Caption like Count updated",
//             data: updated,
//             success: true,
//             error: false
//         })
//     } 
//     catch (err) {
//         res.json({
//             message: err.message || err, 
//             error: true,
//             success: false
//         })
//     }
// }
