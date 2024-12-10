import createServer from "./config/server.js";
import express from "express";
import logger from "./utils/logger.js";
import authRoutes from './routers/authRoutes.js'
import usersRoutes from './routers/usersRoutes.js'
import roomRoutes from './routers/roomRoutes.js'
import chatRoutes from './routers/chatRoutes.js'



import dotenv from 'dotenv'
dotenv.config()

const app = express();
const server = createServer(app)
const PORT = process.env.PORT

// const io = initializeSocket(server)
// export {io}

app.use('/api/auth', authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/communities", usersRoutes)


server.listen(PORT, ()=>{
    logger.info(` Server running on http://localhost:${PORT}`)
})

export default app;