var cookie = require('cookie')

/**
 * Get session id
 * @method __getSessionID
 * @memberof Elvis.prototype
 * @private
 * @param header {Object} - Header Object
 * @returns {String}
 */
module.exports = function getSessionID(header) {
  var sessionId = null
  var cookieHeader = header['set-cookie']

  if(cookieHeader) {

    if(typeof cookieHeader == 'object') {
      cookieHeader = cookieHeader[0]
    }
    
    if(cookieHeader) {
      var cookieObject = cookie.parse(cookieHeader)

      if (cookieObject.JSESSIONID) {
        sessionId = cookieObject.JSESSIONID
      }
    }
  }

  return sessionId
}