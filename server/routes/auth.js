import { Router } from 'express'
import { getMe, login, register } from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

//Register
router.post('/register', register)
//Login
router.post('/login', login)
//Get me
router.get('/me', checkAuth, getMe)

export default router
