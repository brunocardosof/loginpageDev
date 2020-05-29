const Usuario = require("../models/Usuario")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { authSecret } = require('../../.authSecret')

module.exports = {
  async index(req, res) {
    await Usuario.findAll()
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(error => {
        return res.status(400).json(error)
      })
  },

  async getByToken(req, res) {
    const token = req.params.token
    jwt.verify(token, authSecret, async (error, email) => {
      if(error) {
            return res.status(401).json("invalid token")
      } else {
        await Usuario.findOne({ where: { email } })
          .then(data => {
            return res.status(200).json({
              nome: data.nome,
              email: data.email,
              telefone: data.telefone,
              is_social_user: data.is_social_user,
            })
          })
          .catch(error => {
            return res.status(400).json(error)
          })
      }
    });
  },

  async store(req, res) {
    const { nome, email, telefone, senha, foto, isSocialUser } = req.body
    await Usuario.create({
      nome,
      email,
      telefone,
      senha: bcrypt.hashSync(senha, 8),
      foto,
      isSocialUser
    })
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(error => {
        return res.status(400).json(error)
      })
  },

  async update(req, res) {
    const id = req.params.id
    const { nome, email, telefone, foto } = req.body
    await Usuario.update({
      nome,
      email,
      telefone,
      foto
    },
      {
        where: { id: id },
        returning: true,
        plain: true
      })
      .then(data => {
        return res.status(200).json(data[1])
      })
      .catch(error => {
        return res.status(400).json(error)
      })
  },

  async delete(req, res) {
    const id = req.params.id
    await Usuario.destroy({
      where: { id: id }
    })
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(error => {
        return res.status(400).json(error)
      })
  }

}

