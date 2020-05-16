'use strict'

require('dotenv-expand')(require('dotenv').config())
require('module-alias/register')

const methods = require('@pxl/helpers/methods')

// Pass the global object data
global.pxl = {
  config: require('./pxl.config'),
  methods
}

// Initial the database
const database = require('@pxl/helpers/database')
database('mongodb')

// start the server
require('@pxl/start/server')
