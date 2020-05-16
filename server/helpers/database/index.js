'use strict'

const consola = require('consola')
const mongodb = require('./database.mongodb')

module.exports = (database) => {
  switch (database) {
    case 'mongodb':
      return mongodb
      break

    default:
      consola.error({
        message: 'Please provide a database management system.',
        badge: true
      })
      break
  }
}
