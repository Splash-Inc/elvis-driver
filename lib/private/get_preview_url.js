/**
 * Generate preview url with given parameters
 * @method __getPreviewUrl
 * @memberof Elvis.prototype
 * @private
 * @param baseUrl {String} - Base url for appending generated part into
 * @param extension {String} - File extension
 * @param options {Object} - Parameters
 * @returns {String}
 */
module.exports = function getPreviewUrl(baseUrl, extension, options) {
  if (!extension || !options) {
    return baseUrl
  }
  var secondPart = Object.keys(options)
    .map(key => key + '_' + options[key])
    .join('_')
  return baseUrl +  '/previews/' + secondPart + '.' + extension
}
