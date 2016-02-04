/**
 * Browse
 * @param params
 * @returns {Promise}
 */
module.exports = function browse(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to browse.')
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