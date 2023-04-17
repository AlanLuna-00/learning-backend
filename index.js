import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './mongo.js'
connectDB()

import express from 'express'
const app = express()

import { Note } from './models/Note.js'
import { notFound } from './middlewares/notFound.js'
import { handleErrors } from './middlewares/handleError.js'

const PORT = 3001

app.use(express.json())


app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/api/notes', (req, res) => {
	Note.find({}).then((result) => {
		res.send(result)
	})
})

app.get('/api/notes/:id', (req, res, next) => {
	const id = req.params.id

	Note.findById(id).then((result) => {
		res.send(result)
	}).catch((err) => {
		next(err)
	})
})

app.delete('/api/notes/:id', (req, res, next) => {
	const id = req.params.id
	
	Note.findByIdAndDelete(id).then((result) => {
		res.send(result)
	}).catch((err) => {
		next(err)
	})
})

app.post('/api/notes', (req, res) => {
	const { content, important } = req.body

	!content ? res.status(400).send('Data not found') : null

	const newNote = new Note({
		content: content,
		date: new Date(),
		important: important || false,
	})

	newNote.save().then((result) => {
		res.status(201).send(result)
	}).catch((err) => {
		res.status(400).send(err.message)
	})
})

app.put('/api/notes/:id', (req, res, next) => {
	const id = req.params.id
	const { content, important } = req.body

	!content ? res.status(400).send('Data not found') : null

	const newNoteInfo = {
		content: content,
		important: important,
	}

	Note.findByIdAndUpdate(id, newNoteInfo, { new : true}).then((result) => {
		res.status(200).send(result)
	}).catch((err) => {
		next(err)
	})
	
})

app.use(notFound)

app.use(handleErrors)


app.listen(process.env.PORT || 3001, () => {
	console.log(`Example app listening on port ${PORT}!`)
})

