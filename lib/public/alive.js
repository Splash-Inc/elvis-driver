/**
 * Send activity signal to keep the session open
 * @method alive
 * @memberof Elvis.prototype
 * @returns {Promise}
 */
module.exports = function alive() {
  if (!this.sessionID) {
    return Promise.reject('elvis-driver#alive: Authentication required to use alive.')
  }

  return new Promise((resolve, reject) => {
    this.__request({
      url: this.__getRemoteURL('/alive.txt'),
      params: { uid: new Date().getTime() + Math.random() * 99999 },
      success: resolve,
      failure: reject
    })
  })
}