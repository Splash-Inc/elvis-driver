/**
 * Add Session ID
 * @param url
 * @returns {*}
 * @private
 */
module.exports = function withSessionID(url) {
  if (!this.sessionID) {
    return null
  }

  var queryPoint = url.indexOf('?')
  var suffix = ';jsessionid=' + this.sessionID

  if (queryPoint === -1) {
    url += suffix

  } else {
    url = url.substr(0, queryPoint) + suffix + url.substr(queryPoint)
  }

  return url
}