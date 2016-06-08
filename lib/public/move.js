/**
 * Move or rename a folder or a single asset
 * @method move
 * @memberof Elvis.prototype
 *
 * @param params {Object}
 *   Parameters
 *
 * @param params.source {String}
 *   folderPath or assetPath to be moved or renamed
 *
 * @param params.target {String}
 *   Target path
 *
 * @param [params.filterQuery] {String}
 *   Move/rename only source assets that match this query
 *
 * @param [params.flattenFolders] {Boolean}
 *  Flatten any subfolder structure
 *
 * @param [params.async] {Boolean}
 *   Will cause the process to run asynchronous in the background
 *
 * @param [params.folderReplacePolicy="AUTO_RENAME"] {String}
 *   "AUTO_RENAME" | "MERGE" | "THROW_EXCEPTION"
 *
 * @param [params.fileReplacePolicy="AUTO_RENAME"] {String}
 *   "AUTO_RENAME" | "OVERWRITE" | "OVERWRITE_IF_NEWER" | "REMOVE_SOURCE" | "THROW_EXCEPTION" | "DO_NOTHING"
 *
 * @returns {Promise}
 */
module.exports = function move(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#move: Authentication required to move/rename assets/folders.')
  }

  return new Promise((resolve, reject) => {
    var request = {
      url: this.__getRemoteURL('/services/move'),
      success: resolve,
      failure: reject,
      params: params
    }

    this.__request(request)
  })
}
