'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Schema
const UserSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: { type: String, required: true },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    verification_token: String,
    avatar: {
      type: String,
      default: '/images/default-user.png'
    }
  },
  { timestamps: true }
)

// Hash password after save
UserSchema.pre('save', async function(next) {
  const User = this

  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(User.password, salt)

      User.password = hashedPassword
      return next()
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
})

// Hash password after save
UserSchema.pre('save', async function(next) {
  const User = this

  if (this.isModified('verification_token') || this.isNew) {
    try {
      const payload = {
        email: User.email,
        code: Math.floor(100000 + Math.random() * 900000)
      }

      const token = await jwt.sign(payload, process.env.APP_KEY, {
        expiresIn: '2h'
      })
      User.verification_token = token

      return next()
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
})

module.exports = mongoose.model('User', UserSchema)
