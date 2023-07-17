import express from 'express'
import { Login, register, regsteredUserById } from '../controllers/Auth.js'
import { verifyToken } from '../middleware/Auth.js'

const router = express.Router()


router.post('/register',register)

router.post('/login',Login)

router.get('/:id',verifyToken,regsteredUserById)


export default router
