const usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
module.exports = {
    async changePassword(req, res) {
        const id = req.params.id
        const { senhaNova, senhaAtual } = req.body
        const usuarioExists = await usuario.findOne({
            where: { id }
        })
        if (usuarioExists) {
            if (!(bcrypt.compareSync(senhaAtual, usuarioExists.senha))) {
                return res.status(401).json("error senha")
            }

            await usuario.update({
                senha: bcrypt.hashSync(senhaNova, 8),
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
}