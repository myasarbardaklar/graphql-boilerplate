'use strict'

const UserModel = require('@pxl/models/user.model')
const faker = require('faker')

const ids = []

const createUsers = async () => {
  for (let i = 1; i <= 10; i++) {
    let fakeUser = await faker.helpers.userCard()

    let user = {
      fullname: fakeUser.name,
      username: fakeUser.username,
      email: fakeUser.email,
      password: '123456'
    }

    let newUser = new UserModel(user)
    await newUser.save()

    await ids.push(newUser.id)
    console.log(i)
  }
}

const deneme = async () => {
  await createUsers()
  console.log(ids)
}

/* deneme() */

/* UserModel.deleteMany({ verified: false }, function(err) {
  if (err) console.log(err)
  console.log('deleted all')
}) */

module.exports = {
  // Get a user
  async user(parent, args) {
    const user = await UserModel.findById(args.id)
    return user
  },

  // Get all users
  async users(parent, args) {
    const users = await UserModel.find().sort({ createdAt: 'desc' })
    return users
  }
}
