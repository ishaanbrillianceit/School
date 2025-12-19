import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    name: {type: String, required: true},
    subject: {type: String, required: true},
    designation: {type: String, required: true},
    bio: {type: String, required: true},
    image: {type: String, required: true},
}, {timestamps: true})

const Teacher = mongoose.model('teacher', teacherSchema)
export default Teacher