var cookie = require('cookie')
/**
 * Set cookie header
 * @method __setCookieHeader
 * @memberof Elvis.prototype
 * @private
 * @param response {Object} - Response Object
 */
module.exports = function setCookieHeader(response) {
  this.cookieHeader = typeof document === 'undefined' ? response.header['set-cookie'] : document.cookie

  if (this.cookieHeader && Array.isArray(this.cookieHeader)) {
    this.cookieHeader.forEach(header => {
      var parsedHeader = cookie.parse(header)
      if (parsedHeader['JSESSIONID']) {
        this.sessionID = parsedHeader['JSESSIONID']
      }
    })
  }
}
