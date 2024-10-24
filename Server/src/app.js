import createServer from "./config/server.js";
import express from "express";
import logger from "./utils/logger.js";
import authRoutes from './routers/authRoutes.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express();
const server = createServer(app)
const PORT = process.env.PORT

app.use('/api/auth', authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/rooms", usersRoutes)
app.use("/api/chats", usersRoutes)
app.use("/api/communities", usersRoutes)


server.listen(PORT, ()=>{
    logger.info(` Server running on port: ${PORT}`)
})

export default app;




