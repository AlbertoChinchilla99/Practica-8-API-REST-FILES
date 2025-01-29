const plataformasRouter = require('./plataformas')
const usersRoutes = require('./users')
const mainRouter = require('express').Router()
const juegosRouter = require('./juegos')

mainRouter.use('/plataformas', plataformasRouter)
mainRouter.use('/juegos', juegosRouter)
mainRouter.use('/users', usersRoutes)

module.exports = mainRouter
