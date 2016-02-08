var _ = require('lodash')

/**
 * Removes relation nodes
 * @method removeRelation
 * @param relationIds {Array|String} - List of relation ids
 * @returns {Promise}
 */
module.exports = function(relationIds) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required')
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