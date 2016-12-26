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
 * @param isSticky {Boolean} - Sticky session flag; set it true to use one assigned cluster node, false or omit for load balancing
 * @returns {Promise}
 */
module.exports = function login(params, isSticky) {
  return new Promise((resolve, reject) => {
    if (params.withCookie) {
      if (this.__setCookieHeader(null, isSticky)) {
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
            if (this.__setCookieHeader(response, isSticky)) {
              resolve(data)
            } else {
              reject(data)
            }
          } else {
            reject(data)
          }
        }
      })
    }
  })
}