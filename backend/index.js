import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import cors from 'cors'
import morgan from 'morgan'
import ContactRouter from './routes/contact.routes.js'
import EventRouter from './routes/event.routes.js'
import GalleryRouter from './routes/gallery.routes.js'
import NoticeRouter  from './routes/notice.routes.js'
import TeacherRouter from './routes/teacher.routes.js'
import UserRouter from './routes/user.routes.js'

dotenv.config({path: "./config/.env"})

connectDB()

const app = express()

const port = process.env.PORT

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use("/api/contact", ContactRouter)
app.use("/api/event", EventRouter)
app.use("/api/gallery", GalleryRouter)
app.use("/api/notice", NoticeRouter)
app.use("/api/teacher", TeacherRouter)
app.use("/api/user", UserRouter)

app.get('/api/notice', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(notices);
});


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})