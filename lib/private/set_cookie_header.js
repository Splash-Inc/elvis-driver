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
  this.cookieHeader = null

  if (cookieAtResponseHeader) {
    if (Array.isArray(cookieAtResponseHeader)) {
      cookieAtResponseHeader.forEach((header, index) => {
        parsedHeader = cookie.parse(header)
        if (parsedHeader['JSESSIONID']) {
          this.sessionID = parsedHeader['JSESSIONID']
        }
      })
    } else if (typeof cookieAtResponseHeader === 'string') {
      parsedHeader = cookie.parse(cookieAtResponseHeader)
      this.sessionID = parsedHeader['JSESSIONID']
    }
    this.cookieHeader = cookieAtResponseHeader

  } else if (cookieAtDocument) {
    parsedHeader = cookie.parse(cookieAtDocument)
    this.sessionID = parsedHeader['JSESSIONID']
    this.cookieHeader = cookieAtDocument
  }

  // for Elvis v6 compatibility
  if (response && response.body && response.body.csrfToken) {
    this.csrfToken = response.body.csrfToken
  }

  return this.cookieHeader
}