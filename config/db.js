const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true)
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected...${connect.connection.host}`)
  } catch (err) {
    console.log('Error', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
