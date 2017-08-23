var _ = require('lodash')

/**
 * Removes relation nodes
 * @method removePermission
 * @memberof Elvis.prototype
 * @param permissionId {String} - id of the permission
 * @returns {Promise}
 */
module.exports = function removePermission(permissionId) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#removePermission: Authentication required to remove permission.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/api/admin/permission/rule/' + permissionId),
      success: resolve,
      failure: reject
    }, 'delete')
  })
}