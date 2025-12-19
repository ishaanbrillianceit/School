import express from 'express'
import { createTeacher, deleteTeacher, getTeachers, getDetailTeacher, updateTeacher } from '../controllers/teacher.controller.js'
import { auth, isAdmin } from '../middlewares/auth.middleware.js'

const TeacherRouter = express.Router()

TeacherRouter.post("/", createTeacher)
TeacherRouter.get("/",getTeachers)
TeacherRouter.get("/:id", auth, isAdmin,getDetailTeacher)
TeacherRouter.put("/:id", auth, isAdmin,updateTeacher)
TeacherRouter.delete("/:id", auth, isAdmin,deleteTeacher)

export default TeacherRouter