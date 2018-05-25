const Sequelize = require('sequelize')
const defineModel = require('./db')

const UserModel = defineModel('user', {
  name: Sequelize.STRING,
  sex: Sequelize.STRING,
  age: Sequelize.STRING
})

module.exports = UserModel
