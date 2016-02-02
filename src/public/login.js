/**
 * Login
 * @param username
 * @param password
 * @returns {Promise}
 */
module.exports = function login(username, password) {
  var params = { cred: username + ':' + password }

  return new Promise((resolve, reject) => {
    this._request({
      url: this.__getRemoteURL('/services/login'),
      params: params,
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