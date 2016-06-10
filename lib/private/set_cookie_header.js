var cookie = require('cookie')
/**
 * Set cookie header
 * @method __setCookieHeader
 * @memberof Elvis.prototype
 * @private
 * @param response {Object} - Response Object
 */
module.exports = function setCookieHeader(response) {
  var parsedHeader = null
  var cookieAtResponseHeader = response && response.header ? response.header['set-cookie'] : null
  var cookieAtDocument = typeof document !== 'undefined' ? document.cookie : null
  
  if (cookieAtResponseHeader) {
    this.cookieHeader = cookieAtResponseHeader
    if (Array.isArray(cookieAtResponseHeader)) {
      this.cookieHeader.forEach(header => {
        parsedHeader = cookie.parse(header)
        if (parsedHeader['JSESSIONID']) {
          this.sessionID = parsedHeader['JSESSIONID']
        }
      })
    } else if (typeof cookieAtResponseHeader === 'string') {
      parsedHeader = cookie.parse(cookieAtResponseHeader)
      this.sessionID = parsedHeader['JSESSIONID']
    }
  } else if (cookieAtDocument) {
    this.cookieHeader = cookieAtDocument
    parsedHeader = cookie.parse(cookieAtDocument)
    this.sessionID = parsedHeader['JSESSIONID']
  }
}
