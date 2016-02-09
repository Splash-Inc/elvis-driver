/**
 * Transform a result object into one whose url fields are modified to have sessionID
 * @method __hitWithSessionID
 * @private
 * @param hit {Object} - Individual result object in results returned from search
 * @returns {Object}
 */
module.exports = function hitWithSessionID(hit) {
  if (hit.thumbnailUrl)
    hit.thumbnailUrl = this.__withSessionID(hit.thumbnailUrl)

  if (hit.previewUrl)
    hit.previewUrl = this.__withSessionID(hit.previewUrl)

  if (hit.originalUrl)
    hit.originalUrl = this.__withSessionID(hit.originalUrl)

  if (hit.thumbnailHits)
    hit.thumbnailHits.map(this.__hitWithSessionID.bind(this))

  return hit
}