var _ = require('lodash')

/**
 * Search assets
 * @method searchPermission
 * @memberof Elvis.prototype
 * @param params {Object} - Search parameters
 * @param params.sid {String} - user or group id
 * @param [params.query] {String} - Query
 * @param [params.onlyActive] {Boolean} - Returns only active permissions if given `true`
 * @returns {Promise}
 */
module.exports = function searchPermission(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#searchPermission: Authentication required to search permission.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/api/admin/permission/rule/search'),
      params: JSON.stringify(params),
      success: resolve,
      failure: reject
    }, 'post', 'application/json')
  })
}
