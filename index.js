import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './mongo.js'
connectDB()

import express from 'express'
const app = express()

import { Note } from './models/Note.js'

const PORT = 3001

app.use(express.json())

let notes = []

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/api/notes', (req, res) => {
	Note.find({}).then((result) => {
		res.send(result)
	})
})

app.get('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	const note = notes.find(p => p.id === id)
	if (!note) {
		res.status(404).send('The product with the given ID was not found.')
	}
	res.send(note)
})

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	const note = notes.filter(p => p.id !== id)
	!note ? res.status(404).send('The product with the given ID was not found.') : null

	notes = note
	res.send(note)
})

app.post('/api/notes', (req, res) => {
	const { content, price: important } = req.body

	!content || !important ? res.status(400).send('Data not found') : null

	const product = {
		content: content,
		date: new Date(),
		important: important,
	}
	notes.push(product)
	notes = [...notes, product]
	res.status(201).send(product)
})

app.put('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	const { name, price } = req.body

	!name || !price ? res.status(400).send('Data not found') : null

	const product = notes.find(p => p.id === id)

	!product ? res.status(404).send('The product with the given ID was not found.') : null

	product.name = name
	product.price = price

	res.send(product)
})


app.listen(process.env.PORT || 3001, () => {
	console.log(`Example app listening on port ${PORT}!`)
})

