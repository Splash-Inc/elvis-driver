/**
 * Get Away URL
 * @param path
 * @returns {*}
 * @private
 */
module.exports = function getRemoteURL(path) {
  var remoteURL = this.elvisServerURL + path

  if (this.sessionID) {
    return this.__withSessionID(remoteURL)
  }

  return remoteURL
}