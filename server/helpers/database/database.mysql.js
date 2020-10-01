'use strict'

const { Sequelize } = require('sequelize')
const consola = require('consola')

const connection = new Sequelize(
  PXL.config.database.connect.database,
  PXL.config.database.connect.user,
  PXL.config.database.connect.password,
  {
    host: PXL.config.database.connect.host,
    dialect: PXL.config.database.connection
  }
)

const Article = connection.define(
  'article',
  {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
  },
  {
    timestamps: true
  }
)

module.exports = async () => {
  try {
    await connection.authenticate()
    consola.ready({
      message: 'MySQL connection established.',
      badge: true
    })
  } catch (error) {
    console.error(error)
  }
}
