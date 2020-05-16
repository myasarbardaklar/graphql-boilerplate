'use strict'

const UserModel = require('@pxl/models/User')

module.exports = {
  // Find user
  async user(parent, args) {
    const user = await UserModel.findById(parent.user_id)
    return user
  }
}
