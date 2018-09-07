const Sequelize = require('sequelize')
const defineModel = require('./db')

const HouseCheckModel = defineModel('housecheck', {
  room: Sequelize.STRING,
  imgs: Sequelize.STRING,
  desc: Sequelize.STRING
})

module.exports = HouseCheckModel
