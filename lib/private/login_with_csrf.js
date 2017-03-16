var cookie = require('cookie')
/**
 * Set cookie header
 * @method __loginWithBrowserCookie
 * @memberof Elvis.prototype
 * @private
 * @param csrfToken {String} - CSRF Token
 */
module.exports = function loginWithBrowserCookie(csrfToken) {
  if (csrfToken) {
    this.csrfToken = csrfToken
  }

  return this.csrfToken
}
