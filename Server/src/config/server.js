import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { errorHandler } from '../middleware/errorHandler.js'
import {initializeSocket} from '../services/chatServices.js'
import setupChatSocketIO from '../services/ChatService.js'

import connectDB from './database.js'

connectDB()
const createServer = (app) =>{

    app.use(
        cors({
            origin:[
                'http://localhost:5173'
            ],
            methods:["POST","GET","PUT","DELETE"],
            allowedHeaders:["Content-Type", "Authorization", "x-auth-token"]
        }))

    app.use(express.json())

    const server = http.createServer(app)
    const io = new Server(server, {
        cors:{
            origin:[
                'http://localhost:5173'
            ],
            methods:['POST','GET','PUT','DELETE']
        },
    })

    setupChatSocketIO(io)
    // chatServices(io)
    // // webRTC(io)

    // initializeSocket(server)

    app.use(errorHandler)
    return server;

}

export default createServer;