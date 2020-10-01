'use strict'

const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const consola = require('consola')
const database = require('@pxl/helpers/database')

const app = express()

// Initialize middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// Set the static paths
app.use(express.static(path.join(process.cwd(), 'static')))

// Initial the Apollo server
const GraphQLServer = require('@pxl/providers/GraphQL')
GraphQLServer.server.applyMiddleware({ app })

// Start the server
module.exports = async () => {
  try {
    // Initial the database
    await database(PXL.config.database.connection)

    // Listen the server
    await app.listen(PXL.config.port, PXL.config.host, () => {
      consola.ready({
        message: `GraphQL server listening on \`http://${PXL.config.host}:${PXL.config.port}/graphql\``,
        badge: true
      })
    })
  } catch (error) {
    consola.error({
      message: `Unable to start the server \n${error.message}`,
      badge: true
    })
  }
}
