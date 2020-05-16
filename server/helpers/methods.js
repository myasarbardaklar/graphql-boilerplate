'use strict'

module.exports = {
  auth({ user }, roles) {
    if (user.signedIn) {
      if (roles) {
        let permission = roles.find((role) => {
          return user.data.role === role
        })

        return permission ? true : false
      }

      return true
    }

    return false
  }
}
