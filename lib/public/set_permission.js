/**
 * Set a permission rule
 * @method permission
 * @memberof Elvis.prototype
 * @param params {Object} - Parameters object
 * @returns {Promise}
 */
module.exports = function permission(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#permission: Authentication required to set a permission rule.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/api/admin/permission/rule'),
      params: params,
      success: resolve,
      failure: reject,
      contentType: 'application/json'
    })
  })
}
