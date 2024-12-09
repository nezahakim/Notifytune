import express from 'express'
import { findUserById, findUserbyUsername, findAllUsers, updateUser, DeleteUser} from '../controllers/userController.js'

const router = express.Router()

router.get('/id/:id', async (req,res) =>{
    const { id } = req.params

    const data = await findUserById(id);
    res.json(data)
    // console.log(data)
})

router.get('/uname/:uname', async (req,res)=>{
    const { uname } = req.params

    const data = await findUserbyUsername(uname);
    res.json(data)

    // console.log(data)
})

router.get('/all/:all', async (req,res)=>{
    const { all } = req.params

    const data = await findAllUsers(all);
    // console.log(data)
    res.json(data)

})

router.get('/update/:id', async (req,res)=>{
    const { id } = req.params

    const data = await updateUser(id);
    // console.log(data)
    res.json(data)

})

router.get('/delete/:id', async (req,res)=>{
    const { id } = req.params
    const data = await DeleteUser(id);
    // console.log(data)
    res.json(data)

})

export default router