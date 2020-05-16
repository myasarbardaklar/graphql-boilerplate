'use strict'

const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const consola = require('consola')

class Server {
  constructor() {
    this.app = express()
    this.host = process.env.HOST || 'localhost'
    this.port = process.env.PORT || 4747

    this.middleware()
    this.assets()
    this.graphqlprovider()
    this.listen()
  }

  // Initialize middlewares
  middleware() {
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.app.use(cors())
  }

  // Set the static paths
  assets() {
    this.app.use(express.static(path.join(process.cwd(), 'static')))
  }

  graphqlprovider() {
    const graphql = require('@pxl/providers/GraphQL')
    graphql.server.applyMiddleware({ app: this.app })
  }

  // Listen the server
  listen() {
    this.app.listen(this.port, this.host)

    consola.ready({
      message: `GraphQL server listening on \`http://${this.host}:${this.port}/graphql\``,
      badge: true
    })
  }
}

module.exports = new Server()
