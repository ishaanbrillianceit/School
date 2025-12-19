import express from 'express'
import { createNotice, deleteNotice, getNotices, getDetailNotice, updateNotice } from '../controllers/notice.controller.js'
import { auth, isAdmin } from '../middlewares/auth.middleware.js'

const NoticeRouter = express.Router()

NoticeRouter.post("/",  createNotice)
NoticeRouter.get("/", getNotices)
NoticeRouter.get("/:id",auth, isAdmin,  getDetailNotice)
NoticeRouter.put("/:id",auth, isAdmin,  updateNotice)
NoticeRouter.delete("/:id",auth, isAdmin,  deleteNotice)

export default NoticeRouter