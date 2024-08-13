import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'Hey there! I am using ChatterBox.'
        },
        avatar: {
            type: String
        },
        refreshToken: {
            type: String
        }
    }, 
    {
        timestamps: true
    }
)

userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }
        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed
        return next()
    } catch (err) {
        return next(err)
    }
})

userSchema.methods.comparePassword = async function(attempt) {
    return await bcrypt.compare(attempt, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model('User', userSchema)

export default User