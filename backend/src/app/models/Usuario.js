const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { authSecret  } = require('../../../.env')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
    })

    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash)
    }

    User.prototype.generateToken = function() {
        return jwt.sign({ id: this.id }, authSecret)
    }

    return User
}