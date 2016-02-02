/**
 * Update Bulk
 * @param params
 * @returns {Promise}
 */
module.exports = function updateBulk(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to update asset.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/updatebulk'),
      params: params,
      success: resolve,
      failure: reject
    })
  })
}