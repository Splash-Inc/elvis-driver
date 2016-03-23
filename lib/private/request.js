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
      .withCredentials()
      .type('form')
      .on('error', payload.failure.bind(this))

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
          this.sessionID = null
          payload.failure.call(this, { loggedOut: true })
        } else {
          payload.failure.call(this, data)
        }
      } else {
        payload.success.call(this, data)
      }
    }
  })
}