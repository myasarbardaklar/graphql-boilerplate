'use strict'

const TweetModel = require('@pxl/models/tweet.model')
const HashtagModel = require('@pxl/models/hashtag.model')
const faker = require('faker')

const users = [
  '5f0022b9602cd62cbc0ac83e',
  '5f0022ba602cd62cbc0ac83f',
  '5f0022ba602cd62cbc0ac840',
  '5f0022ba602cd62cbc0ac841',
  '5f0022ba602cd62cbc0ac842',
  '5f0022ba602cd62cbc0ac843',
  '5f0022bb602cd62cbc0ac844',
  '5f0022bb602cd62cbc0ac845',
  '5f0022bb602cd62cbc0ac846',
  '5f0022bb602cd62cbc0ac847'
]

const hashtags = [
  '5f0026d4cf9e925b7c4cb376',
  '5f0026d5cf9e925b7c4cb377',
  '5f0026d6cf9e925b7c4cb378',
  '5f0026d6cf9e925b7c4cb379',
  '5f0026d6cf9e925b7c4cb37a',
  null,
  null
]

const createTweets = async () => {
  for (let i = 0; i < 10; i++) {
    let currentHashtags = [faker.helpers.randomize(hashtags)]
    let tweet = {
      innerText: faker.lorem.text(),
      userId: faker.helpers.randomize(users),
      hashtags: currentHashtags
    }

    let newTweet = new TweetModel(tweet)
    await newTweet.save()

    currentHashtags.forEach(async (hashtag) => {
      let currHashtag = await HashtagModel.findById(hashtag)
      if (currHashtag) {
        await HashtagModel.findByIdAndUpdate(currHashtag.id, {
          $set: {
            count: parseInt(currHashtag.count) + 1
          }
        })
      }
    })
  }
}

/* createTweets() */

/* TweetModel.deleteMany({}, function(err) {
  if (err) console.log(err)
  console.log('deleted all')
}) */

module.exports = {
  // Get all tweets
  async get_tweets(parent, args) {
    const tweets = await TweetModel.find()

    return tweets
  }
}
