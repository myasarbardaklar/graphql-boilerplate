'use strict'

const SnapModel = require('@pxl/models/Snap')

module.exports = {
  // Create snap
  async createSnap(parent, args) {
    const newSnap = new SnapModel({
      text: args.data.text,
      user_id: args.data.user_id
    })
    await newSnap.save()

    return newSnap
  }
}
