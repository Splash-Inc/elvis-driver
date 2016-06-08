/**
 * Get remote url
 * @method __getRemoteURL
 * @memberof Elvis.prototype
 * @private
 * @param path {String} - Requested path
 * @returns {String}
 */
module.exports = function getRemoteURL(path) {
  return this.elvisServerURL + path
}