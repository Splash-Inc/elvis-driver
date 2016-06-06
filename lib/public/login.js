/**
 * Login
 * @method login
 * @memberof Elvis.prototype
 * @param params {Object} - An object contains login parameters
 * @param [params.username] {String} - Either username and password or cred is required
 * @param [params.password] {String} - Either username and password or cred is required
 * @param [params.cred] {String} - A base64 string. Either username and password or cred is required
 * @param [params.nextUrl] {String} - Url for next page
 * @param [params.failUrl] {String} - Url for fail page
 * @param [params.locale] {String} - language_COUNTRY
 * @param [params.timezoneOffset] {Number} - Timezone offset in milliseconds
 * @param [params.clientType] {string} - Client type
 * @param [params.returnProfile] {Boolean} - Returns profile info if given `true`
 * @returns {Promise}
 */
module.exports = function login(params) {
  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/login'),
      params: params,
      failure: reject,
      success: (data, response) => {
        if (data.loginSuccess) {
          this.sessionID = this.__getSessionID(response.header)

          if(this.sessionID) {
            resolve(data)
          } else {
            reject({error: 'Cookie is not found in header'})
          }
        } else {
          reject(data)
        }
      }
    })
  })
}