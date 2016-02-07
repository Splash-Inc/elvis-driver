var superagent = require('../utils/superagent')

/**
 * Logout
 * @returns {Promise}
 */
module.exports = function logout() {
  return new Promise((resolve, reject) => {
    if (!this.sessionID) {
      reject('Not Logged In')
      return
    }

    superagent
        .post(this.__getRemoteURL('/services/logout'))
        .withCredentials()
        .end((err, res) => {
          if (err) {
            reject(err)

          } else {
            this.sessionID = null
            var data = res.body
            resolve(data)
          }
        })
  })
}