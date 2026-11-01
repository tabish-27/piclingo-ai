const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')

async function resetPasswordController(req, res){
    try {
        const { token } = req.params
        const { password } = req.body

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })
        if(!user){
            return res.status(400).json({
                message: 'Invalid or Expired token'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()

        res.status(200).json({
            message: 'Password has been reset successfully',
            error: false,
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = resetPasswordController