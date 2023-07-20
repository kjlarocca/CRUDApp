require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors());
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Routes for Zoo Animals
const zooanimalsRouter = require('./routes/zooanimals')
app.use('/zooanimals', zooanimalsRouter)

// Routes for Users
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
