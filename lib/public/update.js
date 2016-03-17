/**
 * Update asset
 * @method update
 * @memberof Elvis.prototype
 * @param id {String} - ID of asset to update
 * @param options {Object} - Update parameters
 * @param [options.metadata] {Object} - Either metadata or Filedata is required
 * @param [options.Filedata] {File} - Either metadata or Filedata is required
 * @param [options.nextUrl] {String} - 301 redirect on success
 * @returns {Promise}
 */
module.exports = function update(id, options) {
  if (!this.sessionID) {
    return Promise.reject('elvis-driver#update: Authentication required to update asset.')
  }

  var params = Object.assign({}, { id }, options)

  return new Promise((resolve, reject) => {
    var request = {
      url: this.__getRemoteURL('/services/update'),
      success: resolve,
      failure: reject
    }

    var _params = params

    if (params.Filedata) {
      request.attach = ['Filedata', params.Filedata]

      _params = JSON.parse(JSON.stringify(_params))
      delete _params.Filedata
    }

    request.params = _params

    this.__request(request)
  })
}