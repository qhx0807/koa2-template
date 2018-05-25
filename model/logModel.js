const Sequelize = require('sequelize')
const defineModel = require('./db')

const LogModel = defineModel('log', {
  method: Sequelize.STRING,
  url: Sequelize.STRING,
  ms: Sequelize.BIGINT,
  host: Sequelize.STRING,
  status: Sequelize.INTEGER,
  desc: Sequelize.STRING,
})

module.exports = LogModel
