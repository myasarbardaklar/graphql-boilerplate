'use strict'

const consola = require('consola')
const mongodb = require('./database.mongodb')

module.exports = async (database) => {
  switch (database) {
    case 'mongodb':
      return await mongodb()
      break

    default:
      consola.error({
        message: 'Please provide a database management system.',
        badge: true
      })
      break
  }
}
