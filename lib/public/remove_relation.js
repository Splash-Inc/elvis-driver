var _ = require('lodash')

/**
 * Removes relation nodes
 * @method removeRelation
 * @memberof Elvis.prototype
 * @param relationIds {Array|String} - List of relation ids
 * @returns {Promise}
 */
module.exports = function removeRelation(relationIds) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#removeRelation: Authentication required to remove relation.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/removeRelation'),
      params: {
        relationIds: _.isArray(relationIds) ? relationIds.join(',') : relationIds
      },
      success: resolve,
      failure: reject
    })
  })
}