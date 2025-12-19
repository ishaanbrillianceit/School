import express from 'express'
import { createUser, deleteUser, getUsers, getDetailUser, updateUser, loginUser } from '../controllers/user.controller.js'
import { auth, isAdmin } from '../middlewares/auth.middleware.js'

const UserRouter = express.Router()

UserRouter.post("/signup", createUser)
UserRouter.post("/login", loginUser)
UserRouter.get("/", auth, isAdmin,getUsers)
UserRouter.get("/:id", auth, getDetailUser)
UserRouter.put("/:id", auth, updateUser)
UserRouter.delete("/:id", auth, deleteUser)

export default UserRouter