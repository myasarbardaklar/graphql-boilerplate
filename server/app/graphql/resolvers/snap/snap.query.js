'use strict'

const { AuthenticationError } = require('apollo-server')

const SnapModel = require('@pxl/models/Snap')

module.exports = {
  // Find snap
  async snap(parent, args, ctx) {
    if (pxl.methods.auth(ctx.req, ['editor', 'admin'])) {
      const snap = await SnapModel.findById(args.id)
      return snap
    }

    throw new AuthenticationError('must authenticate')
  },

  // Find all snaps
  async snaps(parent, args) {
    const snaps = await SnapModel.find().sort({ createdAt: 'desc' })
    return snaps
  }
}
