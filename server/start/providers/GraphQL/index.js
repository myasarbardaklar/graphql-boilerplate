'use strict'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const GraphQLJSON = require('graphql-type-json')

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

    // Pass the schema path
    const schemaPath = path.join(process.cwd(), 'app/graphql/types/schema.gql')

    // Initialize the Apollo Server
    this.server = new ApolloServer({
      typeDefs: importSchema(schemaPath),
      resolvers: {
        JSON: GraphQLJSON,
        ...this.resolvers
      },
      context: async (ctx) => {
        await Authentication(ctx)
        return ctx
      }
    })
  }

  includeResolvers() {
    const resolversPath = path.join(process.cwd(), 'app/graphql/resolvers')
    fs.readdirSync(resolversPath).forEach((resolverFolder) => {
      let currentPath = path.join(resolversPath, resolverFolder)
      fs.readdirSync(currentPath).forEach((resolver) => {
        this.resolverExport(resolver, resolverFolder)
      })
    })
  }

  resolverExport(resolver, folderName) {
    let resolverSplit = _.split(resolver, '.')
    let resolverFile = require(`@pxl/graphql/resolvers/${folderName}/${resolver}`)

    if (resolverSplit[0] === 'index') {
      let _folderName = _.capitalize(folderName)

      if (this.resolvers[`${_folderName}`]) {
        _.assign(this.resolvers[`${_folderName}`], resolverFile)
      } else {
        this.resolvers[`${_folderName}`] = { ...resolverFile }
      }
    } else {
      _.assign(
        this.resolvers[`${_.capitalize(resolverSplit[1])}`],
        resolverFile
      )
    }
  }
}

module.exports = new GraphQLProvider()
