const routes = require('express').Router()

const usuarioController = require('./controllers/usuarioController')
const autenticacaoController = require('./controllers/autenticacaoController')

routes.post('/api/autenticacao/signin',autenticacaoController.signin)

routes.route('/api/usuario')
    .post(usuarioController.store)
    .get(usuarioController.index)
routes.route('/api/usuario/:id')
    .get(usuarioController.getById)
    .put(usuarioController.update)
    .delete(usuarioController.delete)


module.exports = routes