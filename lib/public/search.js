var _ = require('lodash')

/**
 * Search assets
 * @method search
 * @memberof Elvis.prototype
 * @param params {Object} - Search parameters
 * @param params.q {String} - Query
 * @param [params.start] {Number} - Start after this number of results
 * @param [params.num] {Number} - Number of hits to return. Specify 0 to return no hits
 * @param [params.sort] {String} - Comma-delimited list of fields to sort on
 * @param [params.metadataToReturn] {String} - Comma-delimited list of metadata fields
 * @param [params.facets] {String} - Comma-delimited list of fields
 * @param [params.facet.<field>.selection] {String}
 *  Comma-delimited list of values that should be `selected` for a given facet
 * @param [params.appendRequestSecret] {Boolean} - Return results with an encrypted code
 * @returns {Promise}
 */
module.exports = function search(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#search: Authentication required to search.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/search'),
      params: _.defaults({}, params, { num: 50, metadataToReturn: 'all' }),
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
