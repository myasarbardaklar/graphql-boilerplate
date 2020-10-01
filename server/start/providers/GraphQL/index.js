'use strict'

const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const Authentication = require('./GraphQL.authentication')

class GraphQLProvider {
  constructor() {
    this.server = null
    this.resolvers = {
      Query: {},
      Mutation: {}
    }

    // Include resolvers
    this.includeResolvers()

    // Schema
    const schema = makeExecutableSchema({
      typeDefs: importSchema(path.join(process.cwd(), 'typeDefs/schema.gql')),
      resolvers: this.resolvers
    })

    // Initialize the Apollo Server
    this.server = new ApolloServer({
      schema,
      context: async (ctx) => {
        await Authentication(ctx)
        return ctx
      }
    })
  }

  includeResolvers() {
    const resolversPath = path.join(process.cwd(), 'resolvers')
    fs.readdirSync(resolversPath).forEach((resolver) => {
      this.resolverExport(resolver)
    })
  }

  resolverExport(resolver) {
    let resolverSplit = _.split(resolver, '.')
    let resolverFile = require(`@pxl/resolvers/${resolver}`)

    switch (resolverSplit[1]) {
      case 'query':
        _.assign(this.resolvers.Query, resolverFile)
        break

      case 'mutation':
        _.assign(this.resolvers.Mutation, resolverFile)
        break

      default:
        _.assign(this.resolvers, resolverFile)
        break
    }
  }
}

module.exports = new GraphQLProvider()
