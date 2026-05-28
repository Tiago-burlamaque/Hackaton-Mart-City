import Router from 'express'
import { createUser, login } from '../controller/usuario.controller.js'

const userRouter = Router()

userRouter.post('/registro', createUser)
userRouter.post('/login', login)

export default userRouter;