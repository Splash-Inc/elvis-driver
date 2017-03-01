process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

module.exports = function (isBrowser) {
  return {

    server: 'http://ems-test-58337952.eu-west-1.elb.amazonaws.com',

    username: 'test',

    password: 'test',

    folderPath: '/Demo Zone/API TESTS',

    getUniqueName() {
      return isBrowser ?
          `${Date.now()}-${parseInt(Math.random() * 100000)}` :
          process.hrtime().join('-')
    },

    catchError(t) {
      return error => {
        console.error('error:', error)
        t.end('An error occured.')
      }
    },

    shouldRequireLogin(test, promise, Elvis) {
      var lib = '..'
      var client = (Elvis || require(lib)).createClient(this.server)
      var message = 'Authentication should be required'

      return new Promise((resolve, reject) => {
        promise(client)
            .then(() => {
              test.end(message)
            })
            .catch(() => {
              test.pass(message)
              client
                  .login({
                    username: this.username,
                    password: this.password
                  })
                  .catch(reject)
                  .then(() => { resolve(client) })
            })
      })

    },

    deleteAll(Elvis) {
      console.log('Deleting all files from remote')
      var client = Elvis.createClient(this.server)
      return client
          .login({
            username: this.username,
            password: this.password
          })
          .then(() => client
              .search({ q: `ancestorPaths:"${this.folderPath}"`})
              .then(data => {
                var assets = data.hits.map(hit => (
                    client.remove({ id: hit.id })
                ))

                return client
                    .browse({ path: this.folderPath })
                    .then(results => {
                      var folders = results.map(result => (
                          client.remove({ folderPath: result.assetPath })
                      ))

                      return Promise.all(assets.concat(folders))

                    })
              })
          )
          .catch(err => {
            console.error(err)
          })
    }

  }
}
