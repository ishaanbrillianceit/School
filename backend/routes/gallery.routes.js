import express from 'express'
import { createGallery, deleteGallery, getGallerys, getDetailGallery, updateGallery } from '../controllers/gallery.controller.js'
import { auth, isAdmin } from '../middlewares/auth.middleware.js'

const GalleryRouter = express.Router()

GalleryRouter.post("/", createGallery)
GalleryRouter.get("/", getGallerys)
GalleryRouter.get("/:id", auth, isAdmin, getDetailGallery)
GalleryRouter.put("/:id", auth, isAdmin, updateGallery)
GalleryRouter.delete("/:id", auth, isAdmin, deleteGallery)

export default GalleryRouter