/**
 * Email
 * @method email
 * @memberof Elvis.prototype
 * @param params {Object} - Parameters object
 * @returns {Promise}
 */
module.exports = function email(params) {
  if (!this.__isLoggedIn()) {
    return Promise.reject('elvis-driver#email: Authentication required to send an email.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/services/notify/email'),
      params: params,
      success: resolve,
      failure: reject,
      contentType: 'application/json'
    })
  })
}
