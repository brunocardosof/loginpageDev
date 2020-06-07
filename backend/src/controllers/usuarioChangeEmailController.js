const usuario = require('../models/Usuario')

module.exports = {
    async changeEmail(req, res) {
        const id = req.params.id
        const { emailNovo } = req.body
        await usuario.update({
                email: emailNovo,
            }, {
                where: { id }
            })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(error => {
                return res.status(400).json(error)
            })
    }
}