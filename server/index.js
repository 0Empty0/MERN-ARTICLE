import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import authRoute from './routes/auth.js'
import postsRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

//Constants
const { PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routers
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentRoute)

const start = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.f0gcbyf.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
		)

		app.listen(PORT, () => {
			console.log('Server start port ' + PORT)
		})
	} catch (err) {
		console.error(err)
	}
}
start()
