const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authSecret } = require('../../.authSecret') 

module.exports = {
    async signin(req, res) {
        const { email, password } = req.body
        await Usuario.findOne({ where: { email } })
            .then(async data => {
                console.log(data)
                if (data === null) {
                    return res.status(401).json(data)
                } else if (!(bcrypt.compareSync(password, data.password))) {
                    return res.status(401).json(error)
                } else {
                    return res.status(200).json({
                        id: data.id,
                        nome: data.nome,
                        email: data.email,
                        token: jwt.sign(data.id, authSecret),
                    })
                }
            })
            .catch(error => {
                console.log(error)
                return res.status(400).json(error)
            })
    }
}