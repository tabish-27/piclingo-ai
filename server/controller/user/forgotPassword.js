const userModel = require("../../models/userModel")
const crypto = require('crypto')
const nodemailer = require('nodemailer')

async function forgotPasswordController(req, res){
    try {
        const {email} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).json({
                message: "If this email exists, a reset link has been sent on email",
                success: true
            })
        }

        const token = crypto.randomBytes(32).toString('hex')
        const expiration = Date.now() + 1000*60*15 //15 minutes

        user.resetPasswordToken = token
        user.resetPasswordExpires = expiration
        await user.save()

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASSWORD
            }
        })

        await transporter.sendMail({
            to: user.email,
            subject: 'Password reset - PicLingo',
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
        })

        res.status(200).json({
            message: 'Reset link sent if the email exists.',
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

module.exports = forgotPasswordController