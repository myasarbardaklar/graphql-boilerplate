'use strict'

module.exports = {
  mode: 'graphql',

  /*
   * Set the database informations
   * Available database connections: ['mongodb', 'postgres']
   */
  database: {
    connection: process.env.DB_CONNECTION,
    connect: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    }
  },

  /*
   * Set the email configurations
   * https://www.npmjs.com/package/email-templates
   */
  email: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    ssl: process.env.MAIL_SSL,
    tls: process.env.MAIL_TLS,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS
    }
  }
}
