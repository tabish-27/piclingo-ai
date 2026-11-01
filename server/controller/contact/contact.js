const contactModel = require("../../models/contactModel")
const transporter = require('../../config/mailer')

async function contactController(req, res){
    try {
        const {name, email, message} = req.body
        // if(!userId) throw new Error("userId not received") 
        if(!name) throw new Error("Name not received") 
        if(!email) throw new Error("Email not received") 
        if(!message) throw new Error("Message not received") 

        const payload = {...req.body}
        const send = new contactModel(payload)
        const sent = await send.save()

        // res.status(201).json({
        //     message: "Message sent successsfully",
        //     data: sent,
        //     success: true, 
        //     error: false,
        // })

        await transporter.sendMail({
            from: `"WealthWay support" <${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `Support message from ${name}`,
            html : `
                <p> <strong>Name:</strong> ${name}</p>
                <p> <strong>Email:</strong> ${email}</p>
                <p> <strong>Message:</strong> <br/> ${message}</p>
            `,
        });
        res.status(200).json({
            message: "Message sent successsfully. We will contact you shortly",
            data: sent,
            success: true, 
            error: false,
        })


    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}



module.exports = contactController