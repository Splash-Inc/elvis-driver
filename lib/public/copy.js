/**
 * Copy a folder or a single asset
 * @method copy
 * @memberof Elvis.prototype
 * @param params {Object}
 * @param params.source {String} - folderPath or assetPath to copy from
 * @param params.target {String} - folderPath or assetPath to copy to
 * @param [params.folderReplacePolicy] {String} -
 *    Policy used when destination folder already exists.
 *    One of: AUTO_RENAME | MERGE | THROW_EXCEPTION
 * @param [params.fileReplacePolicy] {String} -
 *    Policy used when destination asset already exists.
 *    One of: AUTO_RENAME | OVERWRITE | OVERWRITE_IF_NEWER | REMOVE_SOURCE | THROW_EXCEPTION | DO_NOTHING
 * @param [params.filterQuery] {String} - Only assets that match this query will be copied
 * @param [params.flattenFolders] {Boolean} - Flatten subfolder structures while copying
 * @param [params.async] {Boolean} - Return immediately and run process in the background
 * @returns {Promise}
 */
module.exports = function copy(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#copy: Authentication required to copy.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/copy'),
      params: params,
      success: resolve,
      failure: reject
    })
  })
}
