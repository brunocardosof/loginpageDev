const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authSecret } = require('../../.authSecret')

module.exports = {
    async signinSocialUser(req, res) {
        const { name, email, photoUrl ,authToken, is_social_user = 1 } = req.body
        const userExists = await Usuario.findOne({ where: { email } })
        console.log(userExists)
        if (!userExists) {
            await Usuario.create({
                nome: name,
                email,
                foto: photoUrl,
                is_social_user
            })
                .then(data => {
                    return res.status(200).json(data)
                })
                .catch(error => {
                    return res.status(400).json(error)
                })

        } else {         
            return res.status(200).json({
                id: userExists.id,
                nome: userExists.nome,
                email: userExists.email,
                isSocialUser: true,
                token: jwt.sign(userExists.id, authSecret),
            })
        }
    },
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
    },
    async signup(req, res) {
        const { nome, email, telefone, password, foto } = req.body
        let is_social_user = 0
        await Usuario.create({
            nome,
            email,
            telefone,
            password: bcrypt.hashSync(password, 8),
            is_social_user
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(error => {
                return res.status(400).json(error)
            })
    }
}