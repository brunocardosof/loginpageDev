const routes = require('express').Router()

const UsuarioController = require('./app/controllers/UsuarioController')
const AuthenticationController = require('./app/controllers/AuthenticationController')

routes.post('/api/signin', AuthenticationController.signin)

routes.route('/api/usuario')
    .post(UsuarioController.create)
    .get(UsuarioController.get)

routes.route('/api/usuario/:id')
    .get(UsuarioController.getById)
    .put(UsuarioController.update)
    .delete(UsuarioController.delete)

module.exports = routes