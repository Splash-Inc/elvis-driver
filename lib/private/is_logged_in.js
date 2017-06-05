/**
 * is logged in
 * @method __isLoggedIn
 * @memberof Elvis.prototype
 * @private
 * @returns {Boolean}
 */
module.exports = function isLoggedIn() {
  return !!(this.sessionID || this.csrfToken)
}