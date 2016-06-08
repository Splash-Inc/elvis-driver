/**
 * Get info of current user
 * @method getProfile
 * @memberof Elvis.prototype
 * @returns {Promise}
 */
module.exports = function getProfile() {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#getProfile: Authentication required to get profile data.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/profile'),
      success: resolve,
      failure: reject
    })
  })
}