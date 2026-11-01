const userModel = require("../../models/userModel")
const bcrypt = require("bcryptjs")

async function signUpController(req, res){
    try {
        const {profilePic, firstName, lastName, email, password} = req.body

        const user = await userModel.findOne({email})
        if(user) throw new Error("User already exists with same email")
        
        if(!firstName) throw new Error("Please provide first name")
        if(!lastName) throw new Error("Please provide last name")
        if(!email) throw new Error("Please provide email")
        if(!password) throw new Error("Please provide password")

        //hashing the password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        if(!hashedPassword) throw new Error("Something went wrong in hashed password")

        const payload = {
            ...req.body,
            password: hashedPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser, 
            success: true, 
            error: false,
            message: "User created successfully"
        })
    } 
    catch (err) {
        res.json({
            error: true,
            success: false,
            message: err.message || err,
        })    
    }
}

module.exports = signUpController