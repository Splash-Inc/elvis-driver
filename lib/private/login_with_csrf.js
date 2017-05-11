var cookie = require('cookie')
/**
 * Set CSRF token
 * @method __loginWithCSRF
 * @memberof Elvis.prototype
 * @private
 * @param csrfToken {String} - CSRF Token
 */
module.exports = function loginWithCSRF(csrfToken) {
  if (csrfToken) {
    this.csrfToken = csrfToken
  }

  return this.csrfToken
}
