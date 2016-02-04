/**
 * Get Profile
 * @returns {Promise}
 */
module.exports = function getProfile() {
  if (!this.sessionID) {
    return Promise.reject('Session id required to get profile data.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/profile'),
      success: resolve,
      failure: reject
    })
  })
}