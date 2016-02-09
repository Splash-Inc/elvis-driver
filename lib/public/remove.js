/**
 * Remove asset
 * @method remove
 * @param options {Object} - Parameters
 * @returns {Promise}
 */
module.exports = function remove(options) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required')
  }

  var params = { async: true }

  if (options.folderPath) {
    params.folderPath = options.folderPath

  } else if (options.id) {
    params.q = 'id:' + options.id
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/remove'),
      params: params,
      success: resolve,
      failure: reject
    })
  })
}