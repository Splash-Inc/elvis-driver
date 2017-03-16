var cookie = require('cookie')
/**
 * Set cookie header
 * @method __setCookieHeader
 * @memberof Elvis.prototype
 * @private
 * @param response {Object} - Response Object
 * @param isSticky (Boolean) - Sticky Session flag
 */
module.exports = function setCookieHeader(response, isSticky) {
  isSticky = true
  var parsedHeader = null
  var cookieAtResponseHeader = response && response.header ? response.header['set-cookie'] : null
  var cookieAtDocument = typeof document !== 'undefined' ? document.cookie : null

  if (cookieAtResponseHeader) {
    if (Array.isArray(cookieAtResponseHeader)) {
      cookieAtResponseHeader.forEach((header, index) => {
        parsedHeader = cookie.parse(header)
        if (parsedHeader['JSESSIONID']) {
          this.sessionID = parsedHeader['JSESSIONID']
        }
        if (!isSticky && parsedHeader['AWSELB']) {
          cookieAtResponseHeader.splice(index, 1)
        }
      })
    } else if (typeof cookieAtResponseHeader === 'string') {
      parsedHeader = cookie.parse(cookieAtResponseHeader)
      this.sessionID = parsedHeader['JSESSIONID']
      if (!isSticky && parsedHeader['AWSELB']) {
        delete parsedHeader['AWSELB']
        cookieAtResponseHeader = cookie.serialize(parsedHeader)
      }
    }
    this.cookieHeader = cookieAtResponseHeader

  } else if (cookieAtDocument) {
    parsedHeader = cookie.parse(cookieAtDocument)
    this.sessionID = parsedHeader['JSESSIONID']
    if (!isSticky && parsedHeader['AWSELB']) {
      delete parsedHeader['AWSELB']
      cookieAtDocument = cookie.serialize(parsedHeader)
    }
    this.cookieHeader = cookieAtDocument
  }

  // for Elvis v6 compatibility
  if (response && response.body && response.body.csrfToken) {
    this.sessionID = response.body.csrfToken
  }

  return this.cookieHeader
}
