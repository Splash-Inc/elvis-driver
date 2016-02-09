/**
 * Login
 * @method login
 * @param params {Object} - An object contains login parameters
 * @param [params.username] {String} - _[optional]_ Either username and password or cred is required
 * @param [params.password] {String} - _[optional]_ Either username and password or cred is required
 * @param [params.cred] {String} - _[optional]_ A base64 string. Either username and password or cred is required
 * @param [params.nextUrl] {String} - _[optional]_ Url for next page
 * @param [params.failUrl] {String} - _[optional]_ Url for fail page
 * @param [params.locale] {String} - _[optional]_ language_COUNTRY
 * @param [params.timezoneOffset] {Number} - _[optional]_ Timezone offset in milliseconds
 * @param [params.clientType] {string} - _[optional]_ Client type
 * @param [params.returnProfile] {Boolean} - _[optional]_ Returns profile info if given `true`
 * @returns {Promise}
 */
module.exports = function login(params) {
  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/login'),
      params: params,
      failure: reject,
      success: data => {
        if (data.loginSuccess) {
          this.sessionID = data.sessionId
          resolve(data)
        } else {
          reject(data)
        }
      }
    })
  })
}