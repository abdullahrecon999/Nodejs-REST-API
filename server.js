require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database...'))

app.use(express.json())

const studentRouter = require('./routes/students')
app.use('/students', studentRouter)

app.listen(3000, () => console.log('Server Started'))
