const routes = require('express').Router()

const usuarioController = require('./controllers/usuarioController')
const autenticacaoController = require('./controllers/autenticacaoController')
const usuarioChangePasswordController = require('./controllers/usuarioChangePasswordController')
const usuarioChangeEmailController = require('./controllers/usuarioChangeEmailController')
const emailController = require('./controllers/emailController')
const jwtController = require('./controllers/jwtController')

routes.post('/api/autenticacao/signin', autenticacaoController.signin)
routes.post('/api/autenticacao/signinSocialUser', autenticacaoController.signinSocialUser)
routes.post('/api/autenticacao/signup', autenticacaoController.signup)

routes.route('/api/usuario')
    .post(usuarioController.store)
    .get(usuarioController.index)
routes.route('/api/usuario/:id')
    .put(usuarioController.update)
    .delete(usuarioController.delete)
routes.get('/api/usuario/:token', usuarioController.getByToken)

routes.put('/api/usuario/changePassword/:id', usuarioChangePasswordController.changePassword)
routes.put('/api/usuario/changeEmail/:id', usuarioChangeEmailController.changeEmail)

routes.post('/api/email', emailController.send)

routes.get('/api/jwt/usuarioChangeEmailValidate/:jwt', jwtController.usuarioChangeEmailValidate)


module.exports = routes