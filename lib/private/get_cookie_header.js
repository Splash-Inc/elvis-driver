var cookie = require('cookie')
/**
 * Get cookie header
 * @method __getCookieHeader
 * @memberof Elvis.prototype
 * @private
 * @param response {Object} - Response Object
 */
module.exports = function getCookieHeader(response) {
  this.cookieHeader = response.header['set-cookie']

  if(this.cookieHeader && this.cookieHeader.forEach) {
    this.cookieHeader.forEach(header => {
      var parsedHeader = cookie.parse(header)
      if (parsedHeader['JSESSIONID']) {
        this.sessionId = parsedHeader['JSESSIONID']
      }
    })
  }
}