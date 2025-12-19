import Teacher from "../models/Teacher.models.js"

export const createTeacher = async(req, res) => {
    console.log("This is the Teacher Controller to add Teacher details")
    try {
        const {name, subject, designation, bio, image} = req.body

        if(!name || !subject || !designation || !bio || !image){
            return res.status(400).json({message: "Fill all the fields"})
        }

        const newTeacher = new Teacher({
            name, subject, designation, bio, image
        })

        await newTeacher.save()

        return res.status(201).json({message: "Teacher added successfully", newTeacher})

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error.message}`})
    }
}

export const getTeachers = async(req, res) => {
    try {
        const teachers = await Teacher.find()

        if(!teachers || teachers.length === 0){
            return res.status(404).json({message: "Teachers not found!"})
        }

        return res.status(200).json({message: "Teachers fetched successfully!", teachers})

    } catch (error) {
        return res.status(500).json({message: `Internal server error`, error})
    }
}

export const getDetailTeacher = async (req, res) => {
  const { id } = req.params
  // lookup and return Teacher, e.g.:
  try {
    console.log("The get detail Teacher is working")
    const teacher = await Teacher.findById(id)
    console.log(Teacher)
    if (!Teacher) return res.status(404).json({ message: "Teacher not found" })
    return res.status(200).json({ teacher })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateTeacher = async(req, res) => {
    const {id} = req.params
    try {

        const {body} = req
        const updated = await Teacher.findByIdAndUpdate(id, body, {new: true, runValidators: true})

         if (!updated) return res.status(404).json({ message: "Teacher not found" });

        return res.status(200).json({message: "Teacher updated successfully!", updated})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteTeacher = async(req, res) => {
    const {id} = req.params
    try {
        const deleteTeacher = await Teacher.findByIdAndDelete(id)
        console.log("This is the deleteTeacher: ", deleteTeacher)

        return res.status(200).json({message: "Teacher deleted successfully!"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}