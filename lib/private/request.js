var superagent = require('../utils/superagent')

/**
 * Request
 * @method __request
 * @memberof Elvis.prototype
 * @private
 * @param payload {Object} - Request parameters
 * @param method {String} - Requested method
 */
module.exports = function request(payload, method) {
  var method = method || 'post';
  var methods = ['delete', 'head', 'patch', 'post', 'put'];

  if (methods.indexOf(method) === -1) {
    throw new Error(`${method} is not a valid method name.`)
  }

  var request = superagent
      [method](payload.url)
      .timeout(1000 * 60 * 5)
      .withCredentials()
      .type('form') // default content type
      .on('error', payload.failure.bind(this))

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

  if (payload.attach) {
    request.attach.apply(request, payload.attach)
    request.fields(payload.params)

  } else {
    request.send(payload.params)
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
          this.csrfToken = null
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
