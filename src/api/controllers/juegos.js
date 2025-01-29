const { deleteFile } = require('../../utils/deleteFile')
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
    const juegos = await Juego.find({ categoria, verified: true })
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegosByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params
    const juegos = await Juego.find({
      precio: { $lte: precio },
      verified: true
    })
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
    const newJuego = new Juego(req.body)
    newJuego._id = id

    const oldJuego = await Juego.findById(id)

    if (req.file) {
      // Código para mover la imagen a una nueva carpeta en Cloudinary
      /*
      const newFolder = 'new_folder'; // La nueva carpeta donde mover la imagen
      const oldPublicId = oldJuego.imagen.split('/').slice(-2).join('/').split('.')[0]; // Obtener el public_id actual

      const result = await cloudinary.uploader.rename(
        oldPublicId,
        `${newFolder}/${oldPublicId.split('/').pop()}`
      );

      // Actualizar el path en la base de datos con la nueva ruta
      newJuego.imagen = result.secure_url;
      */

      // Código actual: subir nueva imagen y borrar la anterior
      newJuego.imagen = req.file.path
      deleteFile(oldJuego.imagen)
    }

    const juegoUpdated = await Juego.findByIdAndUpdate(id, newJuego, {
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
