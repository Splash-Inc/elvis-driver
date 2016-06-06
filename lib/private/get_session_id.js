var cookie = require('cookie')

/**
 * Get session id
 * @method __getSessionID
 * @memberof Elvis.prototype
 * @private
 * @param response {Object} - Response Object
 * @returns {String}
 */
module.exports = function getSessionID(response) {
  var sessionId = null
  var cookieHString = typeof document !== 'undefined' ? document.cookie : response.header['set-cookie']

  if(cookieHString) {

    if(typeof cookieHString == 'object') {
      cookieHString = cookieHString[0]
    }
    
    if(cookieHString) {
      var cookieObject = cookie.parse(cookieHString)

      if (cookieObject.JSESSIONID) {
        sessionId = cookieObject.JSESSIONID
      }
    }
  }

  return sessionId
}