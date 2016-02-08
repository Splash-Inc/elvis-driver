/**
 * Update asset
 * @method update
 * @param metadata {Object} - Update parameters
 * @returns {Promise}
 */
module.exports = function update(metadata) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to update asset.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/update'),
      params: metadata,
      success: resolve,
      failure: reject
    })
  })
}