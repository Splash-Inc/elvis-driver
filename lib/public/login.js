/**
 * Login
 * @method login
 * @memberof Elvis.prototype
 * @param params {Object} - An object contains login parameters
 * @param [params.withCookie] {Boolean} - Set it true when the client is already logged in with a valid document cookie
 * @param [params.username] {String} - Either username and password or cred or withCookie is required
 * @param [params.password] {String} - Either username and password or cred or withCookie is required
 * @param [params.cred] {String} - A base64 string. Either username and password or cred or withCookie is required
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
    // Broser cookie login for Elvis v5
    if ('withCookie' in params) {
      if (this.__loginWithBrowserCookie()) {
        resolve()
      } else {
        reject()
      }
    // Browser CSRF Token login for Elvis v6
    } else if ('csrfToken' in params) {
      if (this.__loginWithCSRF(params.csrfToken)) {
        resolve()
      } else {
        reject()
      }
    } else {
      this.__request({
        url: this.__getRemoteURL('/services/login'),
        params: params,
        failure: reject,
        success: (data, response) => {
          if (data.loginSuccess) {
            this.__setCookieHeader(response)
            resolve(data)
          } else {
            reject(data)
          }
        }
      })
    }
  })
}