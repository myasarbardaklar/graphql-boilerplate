'use strict'

const _ = require('lodash')
const jwt = require('jsonwebtoken')

const UserModel = require('@pxl/models/User')

module.exports = async ({ req }) => {
  req.user = {
    signedIn: false,
    data: null
  }

  try {
    const token = await _.split(req.get('Authorization'), ' ')[1]

    if (token) {
      const verifyToken = await jwt.verify(token, process.env.APP_KEY)
      const user = await UserModel.findById(verifyToken.id).select(
        'id email username photo role createdAt updatedAt'
      )

      req.user.signedIn = true
      req.user.data = user
    }
  } catch (error) {
    throw error
  }
}
