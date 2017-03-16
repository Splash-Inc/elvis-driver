var cookie = require('cookie')
/**
 * Set cookie header
 * @method __loginWithBrowserCookie
 * @memberof Elvis.prototype
 * @private
 */
module.exports = function loginWithBrowserCookie() {
  var parsedHeader = null
  var cookieAtDocument = typeof document !== 'undefined' ? document.cookie : null

  if (cookieAtDocument) {
    parsedHeader = cookie.parse(cookieAtDocument)
    this.sessionID = parsedHeader['JSESSIONID']
    this.cookieHeader = cookieAtDocument
  }

  return this.cookieHeader
}
