const { deleteFile } = require('../../config/deleteFile')
const Juego = require('../models/juegos')

const getJuegos = async (req, res, next) => {
  try {
    const juegos = await Juego.find({ verified: true })
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegosAdmin = async (req, res, next) => {
  try {
    const juegos = await Juego.find({ verified: false })
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegoById = async (req, res, next) => {
  try {
    const { id } = req.params
    const juego = await Juego.findById(id)
    return res.status(200).json(juego)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegosByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params
    const juegos = await Juego.find({ categoria })
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegosByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params
    const juegos = await Juego.find({ precio: { $lte: precio } })
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const postJuego = async (req, res, next) => {
  try {
    const newJuego = new Juego(req.body)
    if (req.file) {
      newJuego.imagen = req.file.path
    }
    if (req.user.rol === 'admin') {
      newJuego.verified = true
    } else {
      newJuego.verified = false
    }

    const juegoSaved = await newJuego.save()

    return res.status(201).json(juegoSaved)
  } catch (error) {
    return res.status(400).json('error')
  }
}

const putJuego = async (req, res, next) => {
  try {
    const { id } = req.params

    const juegoExistente = await Juego.findById(id)
    if (!juegoExistente) {
      return res.status(404).json('Juego no encontrado')
    }

    const updatedJuego = { ...req.body }

    if (req.file) {
      if (juegoExistente.imagen) {
        /*
        const oldPublicId = juegoExistente.imagen
          .split('/')
          .slice(-2)
          .join('/')
          .split('.')[0]; // Obtener el public_id actual
        const newFolder = 'new_folder'; // Nueva carpeta en Cloudinary

        const renameResult = await cloudinary.uploader.rename(
          oldPublicId,
          `${newFolder}/${oldPublicId.split('/').pop()}`
        );

        updatedJuego.imagen = renameResult.secure_url; // Actualizar la imagen con la nueva URL
        */
        deleteFile(juegoExistente.imagen)
      }

      updatedJuego.imagen = req.file.path
    }

    if (updatedJuego.verified === undefined) {
      updatedJuego.verified = juegoExistente.verified
    }

    const juegoUpdated = await Juego.findByIdAndUpdate(id, updatedJuego, {
      new: true
    })

    return res.status(200).json(juegoUpdated)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error en la solicitud')
  }
}

const deleteJuego = async (req, res, next) => {
  try {
    const { id } = req.params
    const juegoDeleted = await Juego.findByIdAndDelete(id)
    deleteFile(juegoDeleted.imagen)
    return res.status(200).json(juegoDeleted)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

module.exports = {
  getJuegos,
  getJuegoById,
  getJuegosByCategory,
  getJuegosByPrice,
  postJuego,
  putJuego,
  deleteJuego,
  getJuegosAdmin
}
