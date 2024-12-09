import logger from '../utils/logger.js'

import dotenv from 'dotenv'
dotenv.config()

export const errorHandler = (err, req, res, next) =>{
    logger.err(err.stack)

    res.status(500).json({
        message:" Unexpected Error",
        error: process.env.NODE_ENV === 'production' ? {} : err
    })
}