import User from '../models/User.js'
import logger from '../utils/logger.js'

export const findUserById = async (userId) =>{
    const user = await User.findOne({ _id: userId })
    return user
}

export const findUserbyUsername = async (username) =>{
    const user = await User.findOne({ username: username })
    return user
}

export const findAllUsers = async () =>{
    const users = await User.findMany({ })
    return users;
}

export const updateUser = async (userId,username, fullName, phoneNumber, email, profilePicture, password, address, language, bio, hashtags, websiteUrl, socialMediaLinks, preferences) =>{
    const user = await User.updateOne({ username, fullName, phoneNumber, email, profilePicture, password, address, language, bio, hashtags, websiteUrl, socialMediaLinks, preferences }).where({ _id: userId })
    return user;
}

export const DeleteUser = (userId) =>{
    const user = User.deleteOne({ _id: userId })
    return user;
}