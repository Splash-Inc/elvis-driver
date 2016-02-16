/**
 * Create new asset
 * @method create
 * @memberof Elvis.prototype
 * @param params {Object} - Parameters
 * @param [params.Filedata] {File} - The file to be created in Elvis
 * @param [params.metadata] {Object} - Object containing Elvis fields
 * @param [params.nextUrl] {String} - 301 redirect will happen to this URL if specified
 * @returns {Promise}
 */
module.exports = function create(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to create asset.')
  }

  return new Promise((resolve, reject) => {
    var request = {
      url: this.__getRemoteURL('/services/create'),
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