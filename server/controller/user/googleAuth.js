const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel'); // Fixed path to userModel

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleAuthController(req, res) {
    try {
        const { idToken } = req.body;

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload(); // user info
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            // Split the full name into firstName and lastName
            const nameParts = name.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            // Create user with Google data
            user = await User.create({ 
                email, 
                firstName, 
                lastName, 
                password: 'google-auth-user', // Placeholder password for Google users
                profilePic: picture 
            });
        }

        // Create JWT for your own session
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: '7d',
        });

        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid Google login" });
    }
};

module.exports = googleAuthController