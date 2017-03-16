/**
 * is logged in
 * @method __isLoggedIn
 * @memberof Elvis.prototype
 * @private
 * @returns {Boolean}
 */
module.exports = function isLoggedIn() {
  return !!(this.cookieHeader || this.csrfToken)
}