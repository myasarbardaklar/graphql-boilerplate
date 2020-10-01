'use strict'

const HashtagModel = require('@pxl/models/hashtag.model')
const faker = require('faker')

const ids = []

const createHashtags = async () => {
  for (let i = 1; i <= 7; i++) {
    let hashtag = {
      title: faker.commerce.department()
    }

    let newHashtag = new HashtagModel(hashtag)
    await newHashtag.save()

    await ids.push(newHashtag.id)
    console.log(i)
  }
}

const deneme = async () => {
  await createHashtags()
  console.log(ids)
}

/* deneme() */

/* HashtagModel.deleteMany({ count: 0 }, function(err) {
  if (err) console.log(err)
  console.log('deleted all')
}) */

module.exports = {
  async get_hashtags(parent, args) {
    const hashtags = await HashtagModel.find()
    return hashtags
  },

  async get_hashtag(parent, args) {
    const hashtag = await HashtagModel.findById(args.id)
    return hashtag
  }
}
