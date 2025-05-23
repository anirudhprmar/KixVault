import express from "express";
import chatRoute from '../controllers/chat.controller.js'

const router = express.Router()


router.post('/chat',chatRoute)

export default router