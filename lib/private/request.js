var superagent = require('../utils/superagent')

/**
 * Request
 * @method __request
 * @private
 * @param payload {Object} - Request parameters
 */
module.exports = function request(payload) {
  superagent
      .post(payload.url)
      .withCredentials()
      .type('form')
      .send(payload.params)
      .end((err, res) => {
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