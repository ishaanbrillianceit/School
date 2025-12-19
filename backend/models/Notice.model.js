import mongoose from "mongoose";

const noticeSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    category: {type: String, required: true},
}, {timestamps: true})

const Notice = mongoose.model('notice', noticeSchema)
export default Notice