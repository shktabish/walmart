import User from '../models/user.models.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import jwt from 'jsonwebtoken'

const isPasswordValid = (password) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    return regex.test(password)
}

const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(email)
}

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while generating access and refresh token."})
    }
}

export const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body

        if(!name) {
            return res.status(400).json({message: 'Name is required'})
        }

        if(!email || !isEmailValid(email)) {
            return res.status(400).json({message: 'Email is required and must be a valid email address.'})
        }

        if(!password || !isPasswordValid(password)) {
            return res.status(400).json({message: 'Password is required and must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.'})
        }

        const userExist = await User.findOne({email})
        if(userExist) {
            return res.status(400).json({message: 'User already exists with this email address.'})
        }

        const status = req.body.status || 'Hey there! I am using ChatterBox.'

        let avatarLocalPath, avatar, response
        if(req.file) {
            avatarLocalPath = req.file.path
            response = await uploadOnCloudinary(avatarLocalPath)
        } else {
            avatar = ""
        }

        if(response && response.secure_url) {
            avatar = response.secure_url
        }

        const user = await User.create({
            name,
            email,
            password,
            status,
            avatar
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser) {
            return res.status(500).json({error: "Something went wrong while registering the user"})
        }

        return res.status(200).json({user: createdUser, message: "User created successfully"})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !isEmailValid(email)) {
            return res.status(400).json({message: 'Email is required and must be a valid email address.'})
        }

        if(!password) {
            return res.status(400).json({message: 'Password is required.'})
        }

        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: 'User does not exist with this email address.'})
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        res
        .status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true
        })
        .json({user: loggedInUser, message: "User logged in successfully"})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: error.message})
    }
}

export const logoutUser = async(req, res) => {
    try {
        const user = req.user
        user.refreshToken = ""
        await user.save({validateBeforeSave: false})

        res
        .status(200)
        .clearCookie('accessToken', {httpOnly: true, secure: true})
        .clearCookie('refreshToken', {httpOnly: true, secure: true})
        .json({message: "User logged out successfully"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while logging out the user."})
    }
}

export const getCurrentUser = async(req, res) => {
    try {
        const user = req.user
        return res.status(200).json({user})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while fetching the user."})
    }
}

export const getUserById = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).select("-password -refreshToken") 
        return res.status(200).json({user})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while fetching the user."})
    }
}

export const getNewAccessToken = async(req, res) => {
    try {
        const { refreshToken } = req.cookies

        if(!refreshToken) {
            return res.status(401).json({message: "User not authenticated"})
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decoded._id)

        if(!user) {
            return res.status(403).json({message: "Invalid token"})
        }

        const { accessToken } = await generateAccessAndRefreshToken(user._id)

        res
        .status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true
        })
        .json({message: "New access token generated successfully"})
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while generating new access token."})
    }
}