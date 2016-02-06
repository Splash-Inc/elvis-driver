module.exports = {

  server: '164.40.153.73',

  username: 'test',

  password: 'test',

  folderPath: '/Demo Zone/API TESTS',

  catchError(t) {
    return error => {
      console.log('error:', error)
      t.end('An error occured.')
    }
  },

  shouldRequireLogin(test, promise) {
    var client = require('..').createClient(this.server)
    var message = 'Authentication should be required'

    return new Promise((resolve, reject) => {
      promise(client)
          .then(() => {
            test.end(message)
          })
          .catch(() => {
            test.pass(message)
            client
                .login(this.username, this.password)
                .catch(reject)
                .then(() => { resolve(client) })
          })
    })

  }

}