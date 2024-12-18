import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import { errorHandler } from '../middleware/errorHandler.js'
import ChatServiceIO from '../services/server.js'

import connectDB from './database.js'

connectDB()
const createServer = (app) =>{

    // app.use(
    //     cors({
    //         origin:[
    //             'http://localhost:5173','https://reimagined-eureka-r4g64xprrrrpf4g6-5173.app.github.dev'
    //         ],
    //         methods:["POST","GET","PUT","DELETE"],
    //         allowedHeaders:["Content-Type", "Authorization", "x-auth-token"]
    //     }))

    app.use(cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token','Access-Control-Allow-Origin']
    }));
    

    app.use(express.json())

    const server = http.createServer(app)
    const io = new Server(server, {
        cors:{
            origin:[
                'http://localhost:5173','https://reimagined-eureka-r4g64xprrrrpf4g6-5173.app.github.dev'
            ],
            methods:['POST','GET','PUT','DELETE']
        },
    })

    ChatServiceIO(io)
    

    app.use(errorHandler)
    return server;

}

export default createServer;