import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
    title: {type: String, required: true},
    imageURL: {type: String, required: true},
    date: {type: Date, required: true},
}, {timestamps: true})

const Gallery = mongoose.model('gallery', gallerySchema)
export default Gallery