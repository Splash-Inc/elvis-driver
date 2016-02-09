/**
 * Remove asset
 * @method remove
 * @param options {Object}
 *  An object contains one of these keys:
 *  `id`, `ids`, `q`, `folderPath` to find which assets/folders to remove
 * @returns {Promise}
 */
module.exports = function remove(options) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required')
  }

  options.async = true

  if (options.id) {
    options.q = 'id:' + options.id
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/remove'),
      params: options,
      success: resolve,
      failure: reject
    })
  })
}