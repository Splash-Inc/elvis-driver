var superagent = require('../utils/superagent')

/**
 * Request
 * @method __request
 * @memberof Elvis.prototype
 * @private
 * @param payload {Object} - Request parameters
 */
module.exports = function request(payload) {
  var request = superagent
      .post(payload.url)
      .timeout(1000 * 60 * 5)
      .withCredentials()
      .type('form')
      .on('error', payload.failure.bind(this))

  if (payload.attach) {
    request.attach.apply(request, payload.attach)
    request.fields(payload.params)

  } else {
    request.send(payload.params)
  }

  if (this.cookieHeader && typeof document == 'undefined') {
    request.set('Cookie', this.cookieHeader)
  }

  if (payload.contentType) {
    request.set('Content-Type', payload.contentType);
  }

  // for Elvis v6 compatibility
  if (this.csrfToken) {
    request.set('X-CSRF-TOKEN', this.csrfToken)
  }

  request.end((err, res) => {
    if (err) {
      payload.failure.call(this, err)

    } else {
      var data = res.body
      if (data.errorcode) {
        if (data.errorcode === 401) {
          this.cookieHeader = null
          this.sessionID = null
          payload.failure.call(this, { loggedOut: true })
        } else {
          payload.failure.call(this, data)
        }
      } else {
        payload.success.call(this, data, res)
      }
    }
  })
}
