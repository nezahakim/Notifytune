import express from 'express'
import { newRoom, updateRoom, deleteRoom} from '../controllers/roomController.js'


const router = express.Router()

router.post('/new', async (req, res) =>{
    const {name, username, description, rules} = req.body
    const new_room = await newRoom(name, username, description, rules);
    console.log(new_room)
})

router.post('/update/:id', async (req, res) =>{
    const { id } = req.params
    const {name, username, description, rules} = req.body
    const new_room = await updateRoom(id, name, username, description, rules);
    console.log(new_room)
})

router.get('/delete/:id', async (req, res) =>{
    const { id } = req.params
    const new_room = await deleteRoom(id);
    console.log(new_room)
})

export default router