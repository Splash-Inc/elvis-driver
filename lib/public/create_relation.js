/**
 * Create Relation
 * @param target1Id
 * @param target2Id
 * @param relationType
 * @private
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