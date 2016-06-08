var superagent = require('../utils/superagent')

/**
 * Invalidate current session
 * @method logout
 * @memberof Elvis.prototype
 * @returns {Promise}
 */
module.exports = function logout() {
  return new Promise((resolve, reject) => {
    if (!this.__isLoggedIn()) {
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
            this.cookieHeader = null
            var data = res.body
            resolve(data)
          }
        })
  })
}