require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const juegosRouter = require('./src/api/routes/juegos')
const plataformasRouter = require('./src/api/routes/plataformas')
const cors = require('cors')
const usersRoutes = require('./src/api/routes/users')
const cloudinary = require('cloudinary').v2

const app = express()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/v1/plataformas', plataformasRouter)
app.use('/api/v1/juegos', juegosRouter)
app.use('/api/v1/users', usersRoutes)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000 🤩')
})
