import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const createUser = async(req, res) => {
    console.log("This is the User Controller to add User details")
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password ){
            return res.status(400).json({message: "Fill all the fields"})
        }

        const checkEmail = await User.findOne({email})

        if(checkEmail){
            console.log("User already registered")
            return res.status(400).json({message: "User already registered!"})
        }

        // compute password hash synchronously (bcryptjs)
        const hashedPassword = bcrypt.hashSync(password, 10)

        const newUser = new User({
            name, email, password: hashedPassword
        })

        await newUser.save()

        // remove password before sending response
        const userToReturn = newUser.toObject()
        delete userToReturn.password

        return res.status(201).json({message: "User added successfully", user: userToReturn})

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error.message}`})
    }
}

export const loginUser = async(req, res) => {
    try {
        const{email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "Fill all the fields!"})
        }

        const checkEmail = await User.findOne({email})

        if(!checkEmail)
        {
            console.log("Invalid email or password")
            return res.status(400).json({message: "Invalid email or password!"})
        }

        const compare = await bcrypt.compare(password, checkEmail.password)

        if(!compare){
            console.log("Invalid email or password for password")
            return res.status(400).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({userId: checkEmail._id, email: checkEmail.email, role: checkEmail.role}, process.env.JWT_SECRET, {expiresIn: "1h"})

        const userObj = checkEmail.toObject()
        delete userObj.password

        res.status(200).json({message: "User logged in successfully!", user: {userObj, token}})

    } catch (error) {

    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.find().select('-password')

        if(!users || users.length === 0){
            return res.status(404).json({message: "Users not found!"})
        }

        return res.status(200).json({message: "Users fetched successfully!", users})

    } catch (error) {
        return res.status(500).json({message: `Internal server error`, error})
    }
}

export const getDetailUser = async (req, res) => {
  const { id } = req.params
  // lookup and return User, e.g.:
  try {
    console.log("The get detail User is working")
    const user = await User.findById(id).select('-password')
    console.log(user)
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateUser = async(req, res) => {
    const {id} = req.params
    try {

        const {body} = req
        // if password is being updated, hash it before saving
        if (body.password) {
            body.password = bcrypt.hashSync(body.password, 10)
        }
        const updated = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true}).select('-password')

         if (!updated) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({message: "User updated successfully!", updated})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async(req, res) => {
    const {id} = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        console.log("This is the deleteUser: ", deleteUser)

        return res.status(200).json({message: "User deleted successfully!"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}