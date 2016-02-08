/**
 * Create new asset
 * @method create
 * @param metadata {Object} - Metadata for asset
 * @returns {Promise}
 */
module.exports = function create(metadata) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to create asset.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/create'),
      params: metadata,
      success: resolve,
      failure: reject
    })
  })
}