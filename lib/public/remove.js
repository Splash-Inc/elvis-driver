/**
 * Remove asset
 * @method remove
 * @memberof Elvis.prototype
 * @param options {Object}
 *  An object contains one of these keys:
 *  `id`, `ids`, `q`, `folderPath` to find which assets/folders to remove
 *
 *  And optionally `async: false` if process is meant to be sync.
 * @returns {Promise}
 */
module.exports = function remove(options) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#remove: Authentication required to remove assets/folders.')
  }

  if (options.async !== false) {
    options.async = true
  }

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
