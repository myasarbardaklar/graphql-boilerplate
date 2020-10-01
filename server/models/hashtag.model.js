'use strict'

const mongoose = require('mongoose')

const Hashtag = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Hashtag', Hashtag)
