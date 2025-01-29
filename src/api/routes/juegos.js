const { isAuth, isAdmin } = require('../../middlewares/auth')
const { uploadGame } = require('../../middlewares/file')
const {
  getJuegos,
  getJuegoById,
  getJuegosByCategory,
  getJuegosByPrice,
  postJuego,
  putJuego,
  deleteJuego,
  getJuegosAdmin
} = require('../controllers/juegos')

const juegosRouter = require('express').Router()

juegosRouter.get('/', getJuegos)
juegosRouter.get('/not-verified', [isAdmin], getJuegosAdmin)
juegosRouter.get('/precio/:precio', getJuegosByPrice)
juegosRouter.get('/categoria/:categoria', getJuegosByCategory)
juegosRouter.get('/:id', getJuegoById)
juegosRouter.post('/', [isAuth], uploadGame.single('imagen'), postJuego)
juegosRouter.put('/:id', [isAdmin], uploadGame.single('imagen'), putJuego)
juegosRouter.delete('/:id', [isAdmin], deleteJuego)

module.exports = juegosRouter
