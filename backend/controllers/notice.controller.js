import Notice from "../models/Notice.model.js"

export const createNotice = async(req, res) => {
    console.log("This is the Notice Controller to add Notice details")
    try {
        const {title, description, date, category} = req.body

        if(!title || !description || !date || !category){
            return res.status(400).json({message: "Fill all the fields"})
        }

        const newNotice = new Notice({
            title, description, date, category
        })

        await newNotice.save()

        return res.status(201).json({message: "Notice added successfully", newNotice})

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error.message}`})
    }
}

export const getNotices = async(req, res) => {
    res.set('Cache-Control', 'no-store');
    try {
        const notices = await Notice.find()

        if(!notices || notices.length === 0){
            return res.status(404).json({message: "Notices not found!"})
        }
        console.log("Get notice function is running ",notices)
        return res.status(200).json({notices})

    } catch (error) {
        return res.status(500).json({message: `Internal server error`, error})
    }
}

export const getDetailNotice = async (req, res) => {
  const { id } = req.params
  // lookup and return Notice, e.g.:
  try {
    console.log("The get detail Notice is working")
    const notice = await Notice.findById(id)
    console.log(notice)
    if (!notice) return res.status(404).json({ message: "Notice not found" })
    return res.status(200).json({ notice })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateNotice = async(req, res) => {
    const {id} = req.params
    try {

        const {body} = req
        const updated = await Notice.findByIdAndUpdate(id, body, {new: true, runValidators: true})

         if (!updated) return res.status(404).json({ message: "Notice not found" });

        return res.status(200).json({message: "Notice updated successfully!", updated})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteNotice = async(req, res) => {
    const {id} = req.params
    try {
        const deleteNotice = await Notice.findByIdAndDelete(id)
        console.log("This is the deleteNotice: ", deleteNotice)

        return res.status(200).json({message: "Notice deleted successfully!"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}