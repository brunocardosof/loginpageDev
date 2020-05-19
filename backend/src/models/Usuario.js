const { Model, DataTypes } = require('sequelize')

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize,
            freezeTableName: true,
        })
    }
}

module.exports = Usuario