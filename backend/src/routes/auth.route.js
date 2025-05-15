import express from "express"
import { login, logout, signup, updateProfile, checkAuth,deleteProfile } from "../controllers/auth.controller.js"
import protectRoute from "../middleware/auth.middleware.js"


const router = express.Router()


router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.put('/updateProfile', protectRoute ,updateProfile)

router.get('/check', protectRoute , checkAuth)

router.delete('/deleteProfile',protectRoute,deleteProfile)

export default router;