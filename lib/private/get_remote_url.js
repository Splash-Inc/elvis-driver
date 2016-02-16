/**
 * Get remote url
 * @method __getRemoteURL
 * @memberof Elvis.prototype
 * @private
 * @param path {String} - Requested path
 * @returns {String}
 */
module.exports = function getRemoteURL(path) {
  var remoteURL = this.elvisServerURL + path

  if (this.sessionID) {
    return this.__withSessionID(remoteURL)
  }

  return remoteURL
}