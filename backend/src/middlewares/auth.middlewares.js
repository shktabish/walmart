import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

const verifyJWT = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken

        if(!accessToken) {
            return res.status(403).json({message: "Access token expired or not available. Please login again."})
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decoded._id).select("-password -refreshToken")

        if(!user) {
            return res.status(403).json({message: "Invalid token"})
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while verifying the token"})
    }
}

export default verifyJWT