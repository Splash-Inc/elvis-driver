/**
 * Get previews of assets. Should be used either with assetID or assetPath.
 * @method preview
 * @memberof Elvis.prototype
 * @param assetIdOrPath {String} - Get preview of asset with assetID or assetPath
 * @param [extension] {String} - File extension. Required if options is provided.
 * @param [options] {Object} - Parameters object
 * @param [options.maxWidth] {Number} - Sets the maximum width of the preview
 * @param [options.maxHeight] {Number} - Sets the maximum height of the preview
 * @param [options.scale] {Number} - Sets the width and height of the preview relative to the original size. The scale is in percentages from 1 to 100. If used in combination with maxWidth or maxHeight the image will be scaled with a maximum size.
 * @param [options.ppi] {Number} - Pixels per inch
 * @param [options.dpi] {Number} - Dots per inch
 * @returns {Promise}
 */
module.exports = function preview(assetIdOrPath, extension, options) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#preview: Authentication required to preview.')
  }

  if (!assetIdOrPath) {
    return Promise.reject(
        'elvis-driver#preview: You should pass at least assetID or assetPath as the first parameter')
  }

  var baseUrl = this.__getRemoteURL('/preview/' + assetIdOrPath)
  var urlWithParameters = this.__getPreviewUrl(baseUrl, extension, options)

  return new Promise((resolve, reject) => {
    this.__request({
      url: urlWithParameters,
      params: {},
      success: resolve.bind(null, urlWithParameters),
      failure: reject
    })
  })
}
