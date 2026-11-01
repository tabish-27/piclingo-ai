async function userLogoutController(req, res){
    try {
        // res.clearCookie("authToken")
        res.clearCookie("token", {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        // localStorage.clear();

        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true, 
            success: false
        })
    }
}

module.exports = userLogoutController