/**
 * Update asset
 * @method update
 * @param id {String} - ID of asset to update
 * @param options {Object} - Update parameters
 * @param [options.metadata] {Object} - _[optional]_ Either metadata or Filedata is required
 * @param [options.Filedata] {File} - _[optional]_ Either metadata or Filedata is required
 * @param [options.nextUrl] {String} - _[optional]_ 301 redirect on success
 * @returns {Promise}
 */
module.exports = function update(id, options) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to update asset.')
  }

  var params = Object.assign({}, { id }, options)

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/update'),
      params: params,
      success: resolve,
      failure: reject
    })
  })
}