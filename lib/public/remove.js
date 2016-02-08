/**
 * Remove asset
 * @method remove
 * @param params {Object} - Parameters
 * @returns {Promise}
 */
module.exports = function remove(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/remove'),
      params: { q: 'id:' + params.id, async: true },
      success: resolve,
      failure: reject
    })
  })
}