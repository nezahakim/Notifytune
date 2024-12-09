import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    avatar: String,
    fullName: String,
    username: { type: String, unique: true },
    phoneNumber: Number,
    email: String,
    profilePicture: String,
    password: String,
    address: { 
        country: String, 
        city: String, 
        street: String 
    },
    language: String, 
    bio: String,
    hashtags: [String],
    websiteUrl: String,
    socialMediaLinks: Object,
    preferences: Object,
    joinedAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
export default User;
