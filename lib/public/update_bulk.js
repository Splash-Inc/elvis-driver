/**
 * Update multiple assets at once
 * @method updateBulk
 * @memberof Elvis.prototype
 * @param params {Object} - Bulk update parameters
 * @param params.q {String} - Query for selecting assets
 * @param [params.metadata] {Object} - Metadata object contains fields to update
 * @returns {Promise}
 */
module.exports = function updateBulk(params) {
  if (!this.sessionID) {
    return Promise.reject('elvis-driver#updateBulk: Authentication required to update assets.')
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