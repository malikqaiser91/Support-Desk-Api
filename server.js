const express = require('express')
const dotenv = require('dotenv')
const app = express()

const connectDB = require('./config/db')
const errorHandler = require('./middleware/ErrorHandler')
const notFound = require('./middleware/notFound')

// route files
const userRoute = require('./routes/user')
const ticketRoute = require('./routes/ticket')
// const noteRoute = require('./routes/note')

// config
dotenv.config({ path: './config/config.env' })
connectDB()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/ticket', ticketRoute)
// app.use('/api/v1/note', noteRoute)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

process.on('unhandledRejection', (err) => {
  console.log(`Error `, err)
  server.close(() => process.exit(1))
})
