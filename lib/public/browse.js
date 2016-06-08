/**
 * Browse folders and collections
 * @method browse
 * @memberof Elvis.prototype
 * @param params {Object} - Parameters object
 * @returns {Promise}
 */
module.exports = function browse(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#browse: Authentication required to browse.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/browse'),
      params: params,
      success: resolve,
      failure: reject
    })
  })
}