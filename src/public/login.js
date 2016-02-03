/**
 * Login
 * @param username
 * @param password
 * @returns {Promise}
 */
module.exports = function login(username, password) {
  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/login'),
      params: { username, password },
      success: data => {
        if (data.loginSuccess) {
          this.sessionID = data.sessionId
          resolve(data)
        } else {
          reject(data)
        }
      },
      failure: reject
    })
  })
}