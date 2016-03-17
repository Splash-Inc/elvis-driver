var superagent = require('../utils/superagent')

/**
 * Invalidate current session
 * @method logout
 * @memberof Elvis.prototype
 * @returns {Promise}
 */
module.exports = function logout() {
  return new Promise((resolve, reject) => {
    if (!this.sessionID) {
      reject('elvis-driver#logout: Not logged in.')
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