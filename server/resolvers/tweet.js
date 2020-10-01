'use strict'

const UserModel = require('@pxl/models/user.model')
const HashtagModel = require('@pxl/models/hashtag.model')

module.exports = {
  Tweet: {
    // Find user
    async user(parent, args) {
      const user = await UserModel.findById(parent.userId)
      return user
    },

    // Find hashtags
    async hashtags(parent, args) {
      const hashtags = HashtagModel.find()
        .where('_id')
        .in(parent.hashtags)
        .exec()

      return hashtags
    }
  }
}
