'use strict'

const TweetModel = require('@pxl/models/tweet.model')

module.exports = {
  // Create a tweet
  async create_tweet(parent, args) {
    const newTweet = new TweetModel({
      innerText: args.data.innerText,
      userId: args.data.userId
    })
    await newTweet.save()

    return newTweet
  }
}
