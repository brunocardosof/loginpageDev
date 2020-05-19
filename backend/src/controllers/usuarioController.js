const Usuario = require("../models/Usuario")
const bcrypt = require('bcrypt')

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

  async getById(req, res) {
    const id = req.params.id
    await Usuario.findOne({ where: { id } })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(error => {
        return res.status(400).json(error)
      })
  },

  async store(req, res) {
    const { nome, email, telefone, password} = req.body
    await Usuario.create({
      nome,
      email,
      telefone,
      password: bcrypt.hashSync(password, 8),
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
    const { nome, email, telefone } = req.body
    await Usuario.update({
      nome,
      email,
      telefone,
    },
      {
        where: { id: id }
      })
      .then(data => {
        return res.status(200).json(data)
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
