'use strict'

const { ApolloError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('@pxl/models/user.model')

module.exports = {
  // Sign up mutation
  async signUp(parent, args) {
    try {
      const usernameValidation = await UserModel.findOne({
        username: args.data.username
      })
      if (usernameValidation) {
        throw new ApolloError(
          'Please try with different username.',
          'AlreadyExists',
          {
            errorTitle: 'Username is registered in this system.'
          }
        )
      }

      const emailValidation = await UserModel.findOne({
        email: args.data.email
      })
      if (emailValidation) {
        throw new ApolloError(
          'Please try with different email address.',
          'AlreadyExists',
          {
            errorTitle: 'Email address is registered in this system.'
          }
        )
      }

      const newUser = new UserModel({
        email: args.data.email,
        username: args.data.username,
        password: args.data.password
      })
      await newUser.save()

      return newUser
    } catch (error) {
      throw error
    }
  },

  // Sign in mutation
  async signIn(parent, args) {
    try {
      // Checking email address
      const doc = await UserModel.findOne({
        username: args.data.username
      })
      if (!doc) {
        throw new ApolloError(
          'Please check the information you entered and try again.',
          'NotCorrect',
          {
            errorTitle: 'Email or password is not correct.'
          }
        )
      }

      // Checking password
      const validPass = await bcrypt.compare(args.data.password, doc.password)
      if (!validPass) {
        throw new ApolloError(
          'Please check the information you entered and try again.',
          'NotCorrect',
          {
            errorTitle: 'Email or password is not correct.'
          }
        )
      }

      if (!doc.isActive) {
        throw new ApolloError(
          'Please approve your membership and try again.',
          'MembershipProblem',
          {
            errorTitle: 'Membership has not been approved.'
          }
        )
      }

      // create and assign a token
      const payload = {
        id: doc.id,
        username: doc.username,
        email: doc.email
      }
      const token = await jwt.sign(payload, process.env.APP_KEY)

      return {
        user: {
          id: doc.id,
          username: doc.username,
          email: doc.email,
          avatar: doc.avatar
        },
        token
      }
    } catch (error) {
      throw error
    }
  },

  // Signed user mutation
  async signedUser(parent, args) {
    try {
      const verifyToken = await jwt.verify(args.data.token, process.env.APP_KEY)
      const user = await UserModel.findById(verifyToken.id).select(
        'id email username avatar isActive confirmationToken createdAt updatedAt'
      )

      if (!user) {
        throw new ApolloError(
          'Please sign in and try to access this page again.',
          'UnauthenticatedUser',
          {
            errorTitle: 'You are not authenticated.'
          }
        )
      }

      return { user }
    } catch (error) {
      throw error
    }
  }
}
