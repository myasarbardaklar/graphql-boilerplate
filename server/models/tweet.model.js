'use strict'

const mongoose = require('mongoose')

// Schema
const Tweet = mongoose.Schema(
  {
    innerText: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    hashtags: [mongoose.Schema.Types.ObjectId],
    replies: [mongoose.Schema.Types.ObjectId],
    favorites: [mongoose.Schema.Types.ObjectId]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Tweet', Tweet)
