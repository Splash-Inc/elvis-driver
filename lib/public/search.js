var _ = require('lodash')

/**
 * Search assets
 * @method search
 * @param params {Object} - Search parameters
 * @param params.q {String} - Query
 * @param [params.start] {Number} - _[optional]_ Start after this number of results
 * @param [params.sort] {String} - _[optional]_ Comma-delimited list of fields to sort on
 * @param [params.metadataToReturn] {String} - _[optional]_ Comma-delimited list of metadata fields
 * @param [params.facets] {String} - _[optional]_ Comma-delimited list of fields
 * @param [params.facet.<field>.selection] {String}
 *  _[optional]_ Comma-delimited list of values that should be `selected` for a given facet
 * @param [params.appendRequestSecret] {Boolean} - _[optional]_ Return results with an encrypted code
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