import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

export const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('MongoDB connected')
	} catch (err) {
		console.log(err)
	}
}


