const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authSecret } = require('../../.authSecret')

module.exports = {
    async signinSocialUser(req, res) {
        const { name, email, photoUrl, authToken, is_social_user = 1 } = req.body
        const userExists = await Usuario.findOne({ where: { email } })
        if (!userExists) {
            await Usuario.create({
                    nome: name,
                    email,
                    foto: photoUrl,
                    is_social_user
                })
                .then(data => {
                    return res.status(200).json({
                        id: data.id,
                        nome: data.nome,
                        email: data.email,
                        foto: data.foto,
                        isSocialUser: true,
                        token: jwt.sign(data.email, authSecret),
                    })
                })
                .catch(error => {
                    return res.status(400).json(error)
                })

        } else {
            return res.status(200).json({
                id: userExists.id,
                nome: userExists.nome,
                email: userExists.email,
                foto: userExists.foto,
                telefone: userExists.telefone,
                isSocialUser: true,
                token: jwt.sign(userExists.email, authSecret),
            })
        }
    },
    async signin(req, res) {
        const { email, senha } = req.body
        await Usuario.findOne({ where: { email } })
            .then(async data => {
                if (data === null) {
                    return res.status(401).json(data)
                } else if (!(bcrypt.compareSync(senha, data.senha))) {
                    return res.status(401).json(error)
                } else {
                    return res.status(200).json({
                        id: data.id,
                        nome: data.nome,
                        foto: "",
                        email: data.email,
                        telefone: data.telefone,
                        isSocialUser: false,
                        token: jwt.sign(data.email, authSecret),
                    })
                }
            })
            .catch(error => {
                return res.status(400).json(error)
            })
    },
    async signup(req, res) {
        const { nome, email, telefone, senha, foto } = req.body
        let is_social_user = 0
        await Usuario.create({
                nome,
                email,
                telefone,
                senha: bcrypt.hashSync(senha, 8),
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