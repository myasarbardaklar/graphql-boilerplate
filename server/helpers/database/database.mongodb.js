'use strict'

const mongoose = require('mongoose')
const consola = require('consola')

mongoose.Promise = Promise
mongoose.connection.on('connected', () => {
  consola.ready({
    message: 'MongoDB connection established.',
    badge: true
  })
})
mongoose.connection.on('reconnected', () => {
  consola.ready({
    message: 'MongoDB connection restablished.',
    badge: true
  })
})
mongoose.connection.on('disconnected', () => {
  consola.warn({
    message: 'MongoDB connection disconnected.',
    badge: true
  })
})
mongoose.connection.on('close', () => {
  consola.error({
    message: 'MongoDB connection closed.',
    badge: true
  })
})
mongoose.connection.on('error', (error) => {
  console.error(error)
})

module.exports = async () => {
  await mongoose.connect(
    `mongodb://${PXL.config.database.connect.user}:${PXL.config.database.connect.password}@${PXL.config.database.connect.host}:${PXL.config.database.connect.port}/${PXL.config.database.connect.database}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
}
