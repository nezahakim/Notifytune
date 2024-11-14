import mongoose from "mongoose";

const RoomSchema =  new mongoose.Schema({
    name: String,
    username: String,
    description: String,
    rules: String,
})

const Room = mongoose.model("Room", RoomSchema);
export default Room;
