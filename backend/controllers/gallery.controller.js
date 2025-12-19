import Gallery from "../models/Gallery.model.js"

export const createGallery = async(req, res) => {
    console.log("This is the Gallery Controller to add Gallery details")
    try {
        const {title, imageURL, date} = req.body

        if(!title || !imageURL || !date ){
            return res.status(400).json({message: "Fill all the fields"})
        }

        const newGallery = new Gallery({
            title, imageURL, date
        })

        await newGallery.save()

        return res.status(201).json({message: "Thank You! We will Gallery you ASAP", newGallery})

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error.message}`})
    }
}

export const getGallerys = async(req, res) => {
    try {
        const gallerys = await Gallery.find()

        if(!gallerys || gallerys.length === 0){
            return res.status(404).json({message: "Gallerys not found!"})
        }

        return res.status(200).json({message: "Gallerys fetched successfully!", gallerys})

    } catch (error) {
        return res.status(500).json({message: `Internal server error`, error})
    }
}

export const getDetailGallery = async (req, res) => {
  const { id } = req.params
  // lookup and return Gallery, e.g.:
  try {
    const gallery = await Gallery.findById(id)
    if (!gallery) return res.status(404).json({ message: "Gallery not found" })
    return res.status(200).json({ gallery })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateGallery = async(req, res) => {
    const {id} = req.params
    try {

        const {body} = req
        const updated = await Gallery.findByIdAndUpdate(id, body, {new: true, runValidators: true})

         if (!updated) return res.status(404).json({ message: "Gallery not found" });

        return res.status(200).json({message: "Gallery updated successfully!", updated})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteGallery = async(req, res) => {
    const {id} = req.params
    try {
        const deleteGallery = await Gallery.findByIdAndDelete(id)
        console.log("This is the deleteGallery: ", deleteGallery)

        return res.status(200).json({message: "Gallery deleted successfully!"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}