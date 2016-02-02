var _ = require('lodash')

/**
 * Search
 * @param params
 * @returns {Promise}
 */
module.exports = function search(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to search.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/search'),
      params: _.defaults(params, { num: 50, metadataToReturn: 'all' }),
      success: data => {
        if (data.hits) {
          data.hits.forEach(this.__hitWithSessionID.bind(this))
        }
        resolve(data)
      },
      failure: reject
    })
  })
}