/**
 * Create new folder
 * @method createFolder
 * @memberof Elvis.prototype
 * @param path {Array|String}
 *  Path for folder. If this option is supplied as
 *  array, multiple folders will be created with given paths.
 * @returns {Promise}
 */
module.exports = function createFolder(path) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to create folder.')
  }

  return new Promise((resolve, reject) => {
    if (typeof path === 'object') {
      path = path
          .map(p => `path=${p}`)
          .join('&')

    } else {
      path = `path=${path}`
    }

    this.__request({
      url: this.__getRemoteURL('/services/createFolder'),
      params: path,
      success: resolve,
      failure: reject
    })
  })
}