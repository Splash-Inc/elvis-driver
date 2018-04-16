/**
 * Set a role
 * @method role
 * @memberof Elvis.prototype
 * @param params {Object} - Parameters object
 * @returns {Promise}
 */
module.exports = function role(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#permission: Authentication required to set a role.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/api/admin/permission/roles'),
      params: params,
      success: resolve,
      failure: reject,
      contentType: 'application/json'
    })
  })
}
