/**
 * Create relation between two assets
 * @method createRelation
 * @param target1Id {String} - ID of first asset
 * @param target2Id {String} - ID of second asset
 * @param relationType {String} - Type of relation e.g: 'related'
 * @returns {Promise}
 */
module.exports = function createRelation(target1Id, target2Id, relationType) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to create relation.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/createRelation'),
      success: resolve,
      failure: reject,
      params: { target1Id, target2Id, relationType }
    })
  })

}