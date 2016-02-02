/**
 * Logout
 * @returns {Promise}
 */
module.exports = function logout() {
  return new Promise(resolve => {
    this.sessionID = null
    request
        .post(this.__getRemoteURL('/services/logout'))
        .withCredentials()
        .end((err, res) => {
          if (err) {
            resolve(err)
          } else {
            var data = res.body
            resolve(data)
          }
        })

  })
}