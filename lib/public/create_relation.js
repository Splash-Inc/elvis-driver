/**
 * Create relation between two assets
 * @method createRelation
 * @memberof Elvis.prototype
 * @param target1Id {String} - ID of first asset
 * @param target2Id {String} - ID of second asset
 * @param relationType {String} - Type of relation e.g: 'related'
 * @param [metadata] {Object} - Optional metadata fields to write to relation node
 * @returns {Promise}
 */
module.exports = function createRelation(target1Id, target2Id, relationType, metadata) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#createRelation: Authentication required to create relation.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/createRelation'),
      success: resolve,
      failure: reject,
      params: { target1Id, target2Id, relationType, metadata }
    })
  })

}