import mongoose from "mongoose";

const RoomSchema =  new mongoose.Schema({
    name: String,
    username: String,
    description: String,
    rules: String,
})

const RoomPerticipants = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role:['admin', 'creator', 'visitor'],
    isOnStage: {type: Boolean, default: false},
    isSpeaking:{type: Boolean, default: false}
})

const Room = mongoose.model("Room", RoomSchema);
export default Room;
