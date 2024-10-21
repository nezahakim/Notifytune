import express from 'express'
import http from 'http'
import cors from 'cors'
import socketIO from 'socket.io'
import { errorHandler } from '../middleware/errorHandler'


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
    const io = socketIO(server, {
        cors:{
            origin:[
                'http://localhost:5173'
            ],
            methods:['POST','GET','PUT','DELETE']
        },
    })

    chatServices(io)
    webRTC(io)

    app.use(errorHandler)
    return server;

}

export default createServer;
