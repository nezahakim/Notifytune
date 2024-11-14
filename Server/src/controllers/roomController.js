import Room from '../models/Room.js'
import logger from '../utils/logger.js'

export const newRoom = async (name, username, description, rules) =>{
    const new_room = new Room({ name, username, description, rules })
    new_room.save()

    if(new_room){
        return new_room()
    }else{
        logger.info("To create a new room become a problem. ")
    }
}

export const updateRoom = async(id, name, username, description, rules)=>{
    const upd_room = await Room.updateOne({ name, username, description, rules }).where({ __id: id})
    if (upd_room){
        return upd_room;
    }else{
        logger.info("To update a new room become a problem. ")
    }
}

export const deleteRoom = async(id)=>{
    const upd_room = await Room.deleteOne({ __id: id }).where({ __id: id})
    if (upd_room){
        return upd_room;
    }else{
        logger.info("To delete a new room become a problem. ")
    }
}