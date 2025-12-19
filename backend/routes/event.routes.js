import express from 'express'
import { createEvent, deleteEvent, getEvents, getDetailEvent, updateEvent } from '../controllers/event.controller.js'
import { auth, isAdmin } from '../middlewares/auth.middleware.js'

const EventRouter = express.Router()

EventRouter.post("/", auth, isAdmin, createEvent)
EventRouter.get("/",getEvents)
EventRouter.get("/:id", auth, isAdmin, getDetailEvent)
EventRouter.put("/:id", auth, isAdmin, updateEvent)
EventRouter.delete("/:id", auth, isAdmin, deleteEvent)

export default EventRouter