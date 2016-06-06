var cookie = require('cookie')

/**
 * Get awselb id
 * @method __getAWSELB
 * @memberof Elvis.prototype
 * @private
 * @param response {Object} - Response Object
 * @returns {String}
 */
module.exports = function getAWSELB(response) {
  var cookieName = 'AWSELB'
  var awselbId = null
  var cookieHString = typeof document !== 'undefined' ? document.cookie : response.header['set-cookie']

  if(cookieHString) {
    if(Array.isArray(cookieHString)) {

      cookieHString.map(cs => {
        var parsedCookie = cookie.parse(cs)
        if(parsedCookie[cookieName]) {
          awselbId = parsedCookie[cookieName]
        }
      })

    } else {

      var parsedCookie = cookie.parse(cookieHString)
      if (parsedCookie[cookieName]) {
        awselbId = parsedCookie[cookieName]
      }
    }
  }
  return awselbId
}