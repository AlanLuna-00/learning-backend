import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
	content: String,
	date: Date,
	important: Boolean,
})

export const Note = model('Note', noteSchema)

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})