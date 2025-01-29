const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configuración para la carpeta "Game"
const storageGame = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Game',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'jfif']
  }
})

const uploadGame = multer({ storage: storageGame })

// Configuración para la carpeta "Plataformas"
const storagePlat = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Plataformas',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'jfif']
  }
})

const uploadPlat = multer({ storage: storagePlat })

module.exports = { uploadPlat, uploadGame }
