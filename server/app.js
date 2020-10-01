'use strict'

require('dotenv-expand')(require('dotenv').config())
require('module-alias/register')

const methods = require('@pxl/helpers/methods')

// Pass the global config data
global.PXL = {
  config: require('./pxl.config'),
  methods
}

// Start the server
const startApp = require('@pxl/start/server')
startApp()
