const { User } = require("../models")
const bcrypt = require('bcryptjs')

class UsuarioController {

  async get(req, res) {
    const user = await User.findAll()
      .then(users => {
        res.status(201).json({
          data: users
        })
      })
      .catch(error => {
        res.status(400).json({
          data: [],
          error: error
        })
      })
  }

  async getById(req, res) {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })
    .then(user => {
      res.status(201).json({
        data: user
      })
    })
    .catch(error => {
      res.status(400).json({
        data: [],
        error: error
      })
    })
  }

  async create(req, res) {
    const { nome, email, password_hash } = req.body
    const user = await User.create({
      nome: nome,
      email: email,
      password_hash: bcrypt.hashSync(password_hash, 8)
    })
      .then(user => {
        res.status(201).json({
          data: user,
          message: "Usuario criado com sucesso"
        })
      })
      .catch(error => {
        res.status(400).json({
          data: [],
          error: error
        })
      })
  }

  async update (req, res) {
    const id = req.params.id
    const { nome, email, password_hash } = req.body

    const user = await User.update({
      nome: nome,
      email: email,
      password_hash: bcrypt.hashSync(password_hash, 8)
    },
    {
      where: { id: id  }
    })
    .then(user => {
      res.status(201).json({
        data: user,
        message: "Usuario atualizado com sucesso"
      })
    })
    .catch(error => {
      res.status(400).json({
        data: [],
        error: error
      })
    })
  }

  async delete(req, res) {
    const id = req.params.id
    const user = await User.destroy({
      where: { id: id }
    })
      .then(users => {
        res.status(201).json({
          data: users,
          message: "Usuario deletado com sucesso"
        })
      })
      .catch(error => {
        res.status(400).json({
          data: [],
          error: error
        })
      })
  }

  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    /* if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Incorrect password" })
    } */

    return res.json({
      user,
      token: user.generateToken()
    })
  }
} //and class

module.exports = new UsuarioController()
