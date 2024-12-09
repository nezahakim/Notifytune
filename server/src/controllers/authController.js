import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import logger from '../utils/logger.js'

import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    const {
        username,
        email,
        phoneNumber,
        password,
        language,
        country,
        fullName,
        bio,
        hashtags,
        websiteUrl,
        socialMediaLinks,
        preferences
    } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already in use" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            email,
            phoneNumber,
            language,
            country,
            fullName,
            bio,
            hashtags,
            websiteUrl,
            socialMediaLinks,
            preferences
        });
        await user.save();

        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(201).json({
            message: "Account created successfully",
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                bio: user.bio,
            },
            token,
        });

    } catch (error) {
        logger.error("Error occurred during registration:", error);
        return res.status(500).json({ message: "Something went wrong, please try again later!" });
    }
};


export const login = async (req, res)=>{
    const {
        username,
        password,
    } =  req.body

    try{
        const user = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });
        if (!user) {
            return res.json({ status: false, message: " Invalid username/email " });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ status: false,message: "Invalid username/email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({
            status: true,
            message:"Login Successful",
            user:{
                userId: user._id,
                username: user.username,
                phoneNumber: user.phoneNumber,
                fullName: user.fullName,
                profilePicture: user.profilePicture,
                email: user.email,
                preferences: user.preferences,
            },
            token,
        });

    }catch (error) {
        logger.error("Error Ooccured: ", error.message);
        res.status(400).json({message: " Something went wrong, please try again later!"})
    }

}
